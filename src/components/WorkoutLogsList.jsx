import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { supabase } from '../supabase/client'


const WorkoutLogsList = () => {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [visibleLogs, setVisibleLogs] = useState(3)
  const [filter, setFilter] = useState('semana') // semana, mes o año



useEffect(() => {
  const fetchLogs = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        console.error('No user authenticated')
        return
      }

      const response = await fetch(`http://localhost:5000/workout_logs?user_id=${user.id}`)
      const data = await response.json()
      setLogs(data)
    } catch (error) {
      console.error('Error fetching logs:', error)
    } finally {
      setLoading(false)
    }
  }

  fetchLogs()
}, [])

  if (loading) return <p>Loading workout logs...</p>
  if (logs.length === 0) return <p>No workout logs found.</p>

  const today = dayjs()

  const filtrarLogs = () => {
    switch (filter) {
      case 'semana':
        return logs.filter(log => dayjs(log.date).isAfter(today.subtract(7, 'day')))
      case 'mes':
        return logs.filter(log => dayjs(log.date).isAfter(today.subtract(1, 'month')))
      case 'año':
        return logs.filter(log => dayjs(log.date).isAfter(today.subtract(1, 'year')))
      default:
        return logs
    }
  }

  const logsFiltrados = filtrarLogs()

  const totalEntrenamientos = logsFiltrados.length
  const totalMinutos = logsFiltrados.reduce((acc, log) => acc + (log.duration_minutes || 0), 0)
  const tiempoTotalHoras = Math.floor(totalMinutos / 60)

  const formatFecha = (fechaStr) => {
    const fecha = new Date(fechaStr)
    const hoy = new Date()
    return fecha.toDateString() === hoy.toDateString()
      ? `Hoy - ${fecha.toLocaleDateString('es-CO')}`
      : fecha.toLocaleDateString('es-CO')
  }

  return (
    <div>
      {/* Selector de filtro */}
      <div className="mb-4 text-center text-sm text-gray-600 bg-gray-100 p-2 rounded-lg">
        Filtros:
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="ml-2 p-1 rounded border border-gray-300 text-gray-700"
        >
          <option value="semana">Semana</option>
          <option value="mes">Mes</option>
          <option value="año">Año</option>
        </select>
      </div>

      {/* Resumen */}
      <div className='flex justify-between mb-4 gap-2'>
        <div className='bg-white rounded-xl shadow p-4 w-1/2 text-center'>
          <p className='text-lg font-semibold text-blue-600'>{totalEntrenamientos}</p>
          <p className='text-sm text-gray-500'>Entrenos</p>
        </div>
        <div className='bg-white rounded-xl shadow p-4 w-1/2 text-center'>
          <p className='text-lg font-semibold text-blue-600'>{tiempoTotalHoras} h</p>
          <p className='text-sm text-gray-500'>Tiempo total</p>
        </div>
      </div>

      {/* Lista de Logs */}
      {logsFiltrados.slice(0, visibleLogs).map(log => (
        <div key={log.id} className="bg-white rounded-xl shadow p-4 mb-3">
          <p className="text-xs text-gray-500">{formatFecha(log.date)}</p>
          <p className="font-semibold">{log.notes}</p>
          <p className="text-sm text-gray-600">
            {log.exercise_count} ejercicios • {Math.floor(log.duration_minutes / 60)}h {log.duration_minutes % 60}min
          </p>

          {/* Lista de ejercicios */}
          <ul className="mt-2 space-y-1">
            {log.exercises?.map((exercise, index) => (
              <li key={index} className="text-sm text-gray-700 flex flex-col">
                <span className="font-medium">{exercise.exercise_name}</span>
                <span className="text-gray-500">
                  {exercise.sets}x{exercise.reps} @ {exercise.weight_kg} kg
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Botón ver más */}
      {logsFiltrados.length > visibleLogs && (
        <button
          onClick={() => setVisibleLogs(prev => prev + 3)}
          className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Visualizar más rutinas
        </button>
      )}
    </div>
  )
}

export default WorkoutLogsList