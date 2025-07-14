import { useState } from 'react'
import toast from "react-hot-toast";


const ExerciseLogForm = ({ workoutLogId, onExerciseAdded }) => {
  const [formData, setFormData] = useState({
    exercise_name: '',
    sets: '',
    reps: '',
    weight_kg: '',
    rest_seconds: '',
    notes: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(`http://localhost:5000/exercise_logs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        sets: Number(formData.sets),
        reps: Number(formData.reps),
        weight_kg: Number(formData.weight_kg),
        rest_seconds: Number(formData.rest_seconds),
        workout_log_id: workoutLogId
      })
    });

    if (response.ok) {
      const data = await response.json();
      toast.success('✅ ¡Ejercicio guardado con éxito!');
      setFormData({
        exercise_name: '',
        sets: '',
        reps: '',
        weight_kg: '',
        rest_seconds: '',
        notes: ''
      });
      onExerciseAdded(data); // ✅ SOLO aquí y con la respuesta del backend
        console.log('aqui que oas');
    } else {
      toast.error('❌ Hubo un error al guardar el ejercicio.');
    }

  } catch (error) {
    console.error("Error al guardar el ejercicio:", error);
    toast.error('❌ Error de conexión con el servidor.');
  }
};

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <h3>Add Exercise Log</h3>
      <input name="exercise_name" value={formData.exercise_name} onChange={handleChange} placeholder="Exercise Name" required className="w-full border p-2 rounded"/>
      <div className="flex gap-2">
        <input name="sets" value={formData.sets} onChange={handleChange} placeholder="Sets" required className="w-1/4 border p-2 rounded"/>
        <input name="reps" value={formData.reps} onChange={handleChange} placeholder="Reps" required className="w-1/4 border p-2 rounded"/>
        <input name="weight_kg" value={formData.weight_kg} onChange={handleChange} placeholder="Weight (kg)" required className="w-1/4 border p-2 rounded"/>
        <input name="rest_seconds" value={formData.rest_seconds} onChange={handleChange} placeholder="Rest (s)" required className="w-1/4 border p-2 rounded"/>
      </div>
      <textarea name="notes" value={formData.notes} onChange={handleChange}  rows="2" placeholder="Notes" className="w-full border p-2 rounded" />
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Save</button>
    </form>
  )
}

export default ExerciseLogForm