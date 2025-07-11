import { useState } from 'react'

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
    e.preventDefault()
    const res = await fetch('http://localhost:5000/exercise_logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        workout_log_id: workoutLogId,
        ...formData,
        sets: Number(formData.sets),
        reps: Number(formData.reps),
        weight_kg: Number(formData.weight_kg),
        rest_seconds: Number(formData.rest_seconds)
      })
    })

    if (res.ok) {
      const data = await res.json()
      onExerciseAdded(data) // callback para actualizar lista
      setFormData({
        exercise_name: '',
        sets: '',
        reps: '',
        weight_kg: '',
        rest_seconds: '',
        notes: ''
      })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Exercise Log</h3>
      <input name="exercise_name" value={formData.exercise_name} onChange={handleChange} placeholder="Exercise Name" required />
      <input name="sets" value={formData.sets} onChange={handleChange} placeholder="Sets" required />
      <input name="reps" value={formData.reps} onChange={handleChange} placeholder="Reps" required />
      <input name="weight_kg" value={formData.weight_kg} onChange={handleChange} placeholder="Weight (kg)" required />
      <input name="rest_seconds" value={formData.rest_seconds} onChange={handleChange} placeholder="Rest (s)" required />
      <input name="notes" value={formData.notes} onChange={handleChange} placeholder="Notes" />
      <button type="submit">Save</button>
    </form>
  )
}

export default ExerciseLogForm