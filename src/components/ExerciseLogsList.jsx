import { useEffect, useState } from 'react'

const ExerciseLogsList = ({ workoutLogId }) => {
  const [exercises, setExercises] = useState([])

  useEffect(() => {
    const fetchExercises = async () => {
      const res = await fetch(`http://localhost:5000/exercise_logs?workout_log_id=${workoutLogId}`)
      const data = await res.json()
      setExercises(data)
    }
    fetchExercises()
  }, [workoutLogId])

  return (
    <div>
      <h3>Exercise Logs</h3>
      {exercises.length === 0 ? (
        <p>No exercises logged yet.</p>
      ) : (
        <ul>
          {exercises.map((ex, idx) => (
            <li key={idx}>
              {ex.exercise_name} - {ex.sets}x{ex.reps} @ {ex.weight_kg}kg ({ex.rest_seconds}s rest)
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ExerciseLogsList