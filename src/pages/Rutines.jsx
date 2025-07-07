import { useEffect, useState } from "react"
import routinesData from "../data/routinesData"    //Data for defects
import RoutineCard from "../components/RoutineCard"
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'


const Rutines = () => {
  const [routines, setRoutines] = useState([]);
  const [form, setForm] = useState({
    name: "",
    focus: "",
    duration: "",
    exercises: ""
  });

   // 🔁 Al iniciar, cargar desde localStorage (o usar data de ejemplo)
   useEffect(()=>{
    const storedRoutines = localStorage.getItem("routines")
    if (storedRoutines) {
        setRoutines(JSON.parse(storedRoutines))
    }else{
        setRoutines(routinesData)
    }
   },[])

     // 💾 Cada vez que cambien las rutinas, actualizamos localStorage
     useEffect(()=>{
        if (routines.length>0) {
            localStorage.setItem("routines",JSON.stringify(routines)) 
        }
     },[routines])


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.focus || !form.duration || !form.exercises){
       toast.error("Please fill in all the fields!")
      return

    } 

    const newRoutine = {
      id: Date.now(),
      name: form.name,
      focus: form.focus,
      duration: form.duration,
      exercises: form.exercises.split(",").map((e) => e.trim())
    };

    setRoutines([newRoutine, ...routines]);

    setForm({ name: "", focus: "", duration: "", exercises: "" });
     toast.success("Routine added successfully! 💪");
  };

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold text-blue-600 mb-4">Workout Routines</h1>

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

      {routines.map((routine) => (
          <Link to={`/rutinas/${routine.id}`} key={routine.id}>
              <RoutineCard routine={routine} />
          </Link>
      ))}
    </main>
  );
};

export default Rutines;