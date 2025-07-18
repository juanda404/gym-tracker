import { useEffect, useState } from "react"
import RoutineCard from "../components/RoutineCard"
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { getRoutines, createRoutine } from "../services/api"

const Rutines = () => {
  const [routines, setRoutines] = useState([]);
  const [form, setForm] = useState({
    name: "",
    focus: "",
    duration: "",
    exercises: ""
  });

  const [showForm, setShowForm] = useState(false)

  // ✅ Cargar rutinas desde Supabase
  const fetchRoutines = async () => {
    try {
      const data = await getRoutines()
      setRoutines(data)
    } catch (error) {
      console.error("Error fetching routines:", error.message)
      toast.error("Failed to load routines")
    }
  }

  useEffect(() => {
    fetchRoutines()
  }, [])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.focus || !form.duration || !form.exercises){
       toast.error("Please fill in all the fields!")
      return
    } 

    const today = new Date().toISOString().split("T")[0]; //YYYY-MM-DD

    const newRoutine = {
      name: form.name,
      focus: form.focus,
      duration: form.duration,
      exercises: form.exercises.split(",").map((e) => e.trim()),
      date: today,
      completed: false
    };

    try {
      const saved = await createRoutine(newRoutine)
      setRoutines([saved, ...routines]) // añadir al principio
      setForm({ name: "", focus: "", duration: "", exercises: "" });
      toast.success("Routine added successfully! 💪");
      setShowForm(false);
    } catch (error) {
      console.error("Error saving routine:", error.message)
      toast.error("Failed to add routine")
    }
  };

  return (
    <main className="p-4">
      <div className="mb-4 flex items-center gap-1">
           <h1 className="text-xl font-bold text-blue-600">Workout Routines</h1>
           <button
              onClick={()=> setShowForm(!showForm)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
           >+ New</button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 p-4 rounded-lg mb-6"
        >
          <input
            className="w-full mb-2 p-2 border rounded"
            type="text"
            name="name"
            placeholder="Routine Name"
            value={form.name}
            onChange={handleChange}
          />
          <input
            className="w-full mb-2 p-2 border rounded"
            type="text"
            name="focus"
            placeholder="Focus (e.g. Legs, Arms)"
            value={form.focus}
            onChange={handleChange}
          />
          <input
            className="w-full mb-2 p-2 border rounded"
            type="text"
            name="duration"
            placeholder="Duration (e.g. 60 min)"
            value={form.duration}
            onChange={handleChange}
          />
          <textarea
            className="w-full mb-2 p-2 border rounded"
            name="exercises"
            placeholder="Exercises (comma separated)"
            value={form.exercises}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Add Routine
          </button>
        </form>
      )}

      {routines.length === 0 && <p>No routines found 😢</p>}

      {routines.map((routine) => (
          <Link to={`/rutinas/${routine.id}`} key={routine.id}>
              <RoutineCard routine={routine} />
          </Link>
      ))}
    </main>
  );
};

export default Rutines;