import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from 'react-hot-toast'

const RoutineDetail = () =>{
    const {id} = useParams()
    const navigate = useNavigate()
    const [routine, setRoutine ] = useState(null)

    const [editMode, setEditMode] = useState(false)
    const [form, setForm] = useState({
        name:'',
        focus:'',
        duration: '',
        exercises: ''
    })
    
    useEffect(()=>{
        const stored = localStorage.getItem('routines')
        if (stored) {
            const allRoutines = JSON.parse(stored)
            const found = allRoutines.find(r => r.id === parseInt(id))
            if (found) {
                setRoutine(found)
                setForm({
                    name: found.name,
                    focus: found.focus,
                    duration: found.duration,
                    exercises: found.exercises.join(', ')
                })
                
            }
        }
    },[id])
const handleDelete = () => {
    const stored = localStorage.getItem('routines')
    if (!stored) return
    const allRoutines = JSON.parse(stored)
    const updated = allRoutines.filter(r => r.id !== parseInt(id))
    localStorage.setItem('routines', JSON.stringify(updated))
    navigate('/rutinas')
    toast.error('Routine deleted!')
  }

  const handleEditToggle = () => {
    if(editMode) toast('Edit cancelled')
    setEditMode(!editMode)
  }

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleUpdate = e => {

    if (!form.name.trim() || !form.focus.trim() || !form.duration.trim()) {
  toast.error('All fields are required')
  return
}
    e.preventDefault()
    const updatedRoutine = {
      ...routine,
      name: form.name,
      focus: form.focus,
      duration: form.duration,
      exercises: form.exercises.split(',').map(e => e.trim())
    }

    const stored = localStorage.getItem('routines')
    if (!stored) return
    const allRoutines = JSON.parse(stored)
    const updatedList = allRoutines.map(r =>
      r.id === updatedRoutine.id ? updatedRoutine : r
    )
    localStorage.setItem('routines', JSON.stringify(updatedList))
    setRoutine(updatedRoutine)
    setEditMode(false)

    toast.success('Routine updated successfully!')
  }

  if (!routine) {
    return <p className="p-4 text-red-500">Routine not found</p>
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Routine Details</h2>

      {!editMode ? (
        <div className="bg-white rounded-lg shadow p-4">
          <p><strong>Name:</strong> {routine.name}</p>
          <p><strong>Focus:</strong> {routine.focus}</p>
          <p><strong>Duration:</strong> {routine.duration}</p>
          <p><strong>Exercises:</strong></p>
          <ul className="list-disc ml-6 text-sm text-gray-700">
            {routine.exercises.map((ex, idx) => (
              <li key={idx}>{ex}</li>
            ))}
          </ul>

          <div className="mt-4 flex gap-2">
            <button
              onClick={handleEditToggle}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleUpdate} className="bg-gray-100 p-4 rounded">
          <input
            className="w-full mb-2 p-2 border rounded"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Routine Name"
          />
          <input
            className="w-full mb-2 p-2 border rounded"
            name="focus"
            value={form.focus}
            onChange={handleChange}
            placeholder="Focus"
          />
          <input
            className="w-full mb-2 p-2 border rounded"
            name="duration"
            value={form.duration}
            onChange={handleChange}
            placeholder="Duration"
          />
          <textarea
            className="w-full mb-2 p-2 border rounded"
            name="exercises"
            value={form.exercises}
            onChange={handleChange}
            placeholder="Exercises (comma separated)"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleEditToggle}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default RoutineDetail