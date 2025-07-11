import { Dumbbell } from "lucide-react";
import { useState, useEffect } from "react";

export default function WorkoutLogForm(){
    const [date, setDate] = useState("")
    const [duration, setDuration] = useState(0);
    const [notes, setNotes] = useState("");
    const [routineId, setRoutineId] = useState("");
    const [routines, setRoutines] = useState([]);

    const userId = "demo-user-id"; // 🔐 Reemplazar con ID real del usuario

      useEffect(() => {
    // Trae rutinas para el selector
    fetch("http://localhost:5000/routines")
      .then((res) => res.json())
      .then((data) => setRoutines(data))
      .catch((err) => console.error("Error fetching routines:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const logData = {
      user_id: userId,
      date,
      routine_id: routineId || null,
      duration_minutes: duration,
      notes,
    };

    try {
      const res = await fetch("http://localhost:5000/workout_logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(logData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      alert("✅ Workout log created!");
      // Limpiar campos
      setDate("");
      setDuration(0);
      setNotes("");
      setRoutineId("");
    } catch (error) {
      console.error("❌ Error submitting log:", error.message);
      alert("Error: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg space-y-5 mt-10">
    
    <div className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-xl p-4 mb-4">
        <h2 className="text-xl text-white font-semibold flex items-center gap-2 "> <Dumbbell size={20} />New Workout Log</h2>
        <p className="text-sm opacity-80">Register your daily progress</p>
    </div>
    <div className="flex gap-3 max-sm:flex-col ">
      <div className="flex  flex-col w-1/2 space-y-2">
        <label className="w-full text-sm font-medium text-gray-700 text-start">📅 Date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500" />
      </div>
      <div className="flex  flex-col w-1/2 space-y-2">
        <label className="w-full text-sm font-medium text-gray-700 text-start">⏱ Duration (min)</label>
        <input type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} required className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500" />
      </div>
    </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 text-start">🏋️ Routine (optional)</label>
        <select value={routineId} onChange={(e) => setRoutineId(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring focus:ring-blue-500"
    >
          <option value="">-- Select routine --</option>
          {routines.map((routine) => (
            <option key={routine.id} value={routine.id}>
              {routine.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 text-start">🗒️ Notes</label>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows="3" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
      placeholder="How did your workout go?" />
      </div>
      <div className="flex gap-3 pt-3">
      <button type="submit" className="w-1/2 bg-gradient-to-r from-blue-600 to-indigo-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all">
        ➕ Save Workout
      </button>
      <button type="button" className="w-1/2 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-all"> X Cancel</button>
      </div>
    </form>
  );
}