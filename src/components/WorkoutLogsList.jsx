import { useEffect, useState } from 'react'

const WorkoutLogsList = () => {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch('http://localhost:5000/workout_logs')
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

  return (
    <div>
      <h2>Workout Logs</h2>
      <ul>
        {logs.map(log => (
          <li key={log.id}>
            <strong>{log.date}</strong> - {log.notes || 'No notes'} - {log.duration_minutes} mins
          </li>
        ))}
      </ul>
    </div>
  )
}

export default WorkoutLogsList