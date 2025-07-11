import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import AddExerciseForm from "../components/AddExerciseForm"
import { getExercisesByLogId, createExerciseLog} from "../services/api"

const AddExercisesPag = ()=>{

    const { workoutLogId } = useParams()
    const [exercises, setExercises] = useState([])

    const fetchExercises = async () =>{
        const data = await getExercisesByLogId(workoutLogId)
        setExercises(data)
    }

    useEffect(()=>{
        fetchExercises()
    },[workoutLogId])

    const handleAddExercise = async (exerciseData) =>{
        await createExerciseLog({ ...exerciseData, workout_log_id: workoutLogId})
        fetchExercises()
    }

      return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-2">🏋️ Add Exercises to Workout</h2>
      <AddExerciseForm onSubmit={handleAddExercise} />
      <hr className="my-4" />
      <h3 className="text-lg font-semibold mb-2">📜 Exercises Added</h3>
      <ul className="space-y-2">
        {exercises.map((ex) => (
          <li key={ex.id} className="border p-2 rounded shadow">
            {ex.name} - {ex.sets}x{ex.reps}x{ex.weight}kg - Rest: {ex.rest}s
          </li>
        ))}
      </ul>
    </div>
      )
}

export default AddExercisesPag