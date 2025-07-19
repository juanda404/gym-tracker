import { useEffect, useState } from 'react'

const WorkoutLogsList = () => {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [visibleLogs, setVisibleLogs] = useState(3)
  const [totalEntrenamientos, setTotalEntrenamientos] = useState(0)
  const [tiempoTotalHoras, setTiempoTotalHoras] = useState(0)

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch('http://localhost:5000/workout_logs')
        const data = await response.json()
        setLogs(data)

        // Cálculos resumen
        setTotalEntrenamientos(data.length)
        const totalMinutos = data.reduce((acc, log) => acc + (log.duration_minutes || 0), 0)
        setTiempoTotalHoras(Math.floor(totalMinutos / 60))



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

    const formatFecha = (fechaStr) => {
    const fecha = new Date(fechaStr)
    const hoy = new Date()
    return fecha.toDateString() === hoy.toDateString()
      ? `Hoy - ${fecha.toLocaleDateString('es-CO')}`
      : fecha.toLocaleDateString('es-CO')
  }

  return (
    <div>
      <h2 className="text-sm text-gray-500">Review your progress and consistency.</h2>
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
       {logs.slice(0, visibleLogs).map(log => (
        <div key={log.id} className="bg-white rounded-xl shadow p-4 mb-3">
          <p className="text-xs text-gray-500">{formatFecha(log.date)}</p>
          <p className="font-semibold">{log.notes}</p>
          <p className="text-sm text-gray-600">
            {log.exercise_count} ejercicios • {Math.floor(log.duration_minutes / 60)}h {log.duration_minutes % 60}min
          </p>
        </div>
      ))}
            {/* Botón ver más */}
      {logs.length > visibleLogs && (
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