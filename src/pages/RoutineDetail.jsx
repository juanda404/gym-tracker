import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from 'react-hot-toast'
import supabase  from "../supabase/client"

const RoutineDetail = () =>{
    const {id} = useParams()
    const navigate = useNavigate()
    const [routine, setRoutine ] = useState(null)

    const [editMode, setEditMode] = useState(false)
    const [form, setForm] = useState({
        name:'',
        focus:'',
        duration: '',
        exercises: '',
        date:'',
        completed: false
    })
    
    useEffect(()=>{
          const fetchRoutine = async () => {
      const { data, error } = await supabase
        .from('routines')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        toast.error('Error fetching routine')
        console.error(error)
        return
      }

      setRoutine(data)
      setForm({
        name: data.name || '',
        focus: data.focus || '',
        duration: data.duration || '',
        exercises: data.exercises?.join(', ') || '',
        day: data.day || '',
        completed: data.completed || false
      })
    }

    fetchRoutine()

    },[id])
const handleDelete = async () => {
    const { error } = await supabase
      .from('routines')
      .delete()
      .eq('id', id)

    if (error) {
      toast.error('Error deleting routine')
      console.error(error)
      return
    }

    toast.success('Routine deleted!')
    navigate('/rutinas')
  }

  const handleEditToggle = () => {
    if(editMode) toast('Edit cancelled')
    setEditMode(!editMode)
  }

  const handleChange = e => {
     const { name, value, type, checked } = e.target
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleUpdate = async e => {
      e.preventDefault()

    if (!form.name.trim() || !form.focus.trim() || !form.duration.trim()) {
  toast.error('All fields are required')
  return
}
  
    const updatedRoutine = {
      name: form.name,
      focus: form.focus,
      duration: form.duration,
      exercises: form.exercises.split(',').map(e => e.trim()),
      date: form.completed,
      completed: form.completed
    }

    const { error, data } = await supabase
      .from('routines')
      .update(updatedRoutine)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      toast.error('Error updating routine')
      console.error(error)
      return
    }

    setRoutine(data)
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
          <p><strong>Day:</strong> {routine.day}</p>
          <p><strong>Completed:</strong> {routine.completed ? 'Yes' : 'No'}</p>
          <p><strong>Exercises:</strong></p>
          <ul className="list-disc ml-6 text-sm text-gray-700">
            {routine.exercises.map((ex, idx) => (
              <li key={idx}>{ex}</li>
            ))}
          </ul>

          <div className="mt-4 flex gap-2">
            <button onClick={handleEditToggle} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
              Edit
            </button>
            <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
              Delete
            </button>
            <button onClick={() => navigate('/rutinas')} className="text-white bg-blue-500 rounded hover:underline text-sm">
              Back to routines
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleUpdate} className="bg-gray-100 p-4 rounded">
          <input className="w-full mb-2 p-2 border rounded" name="name" value={form.name} onChange={handleChange} placeholder="Routine Name" />
          <input className="w-full mb-2 p-2 border rounded" name="focus" value={form.focus} onChange={handleChange} placeholder="Focus" />
          <input className="w-full mb-2 p-2 border rounded" name="duration" value={form.duration} onChange={handleChange} placeholder="Duration" />
          <input className="w-full mb-2 p-2 border rounded" name="day" value={form.day} onChange={handleChange} placeholder="Day" />
          <textarea className="w-full mb-2 p-2 border rounded" name="exercises" value={form.exercises} onChange={handleChange} placeholder="Exercises (comma separated)" />
          <div className="mb-2">
            <label className="text-sm mr-2">
              <input type="checkbox" name="completed" checked={form.completed} onChange={handleChange} />
              <span className="ml-2">Completed</span>
            </label>
          </div>
          <div className="flex gap-2">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Save
            </button>
            <button type="button" onClick={handleEditToggle} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default RoutineDetail