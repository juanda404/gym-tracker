import useExerciseStats from "./useExerciseStats"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'

const ExerciseLogsList = () => {
  const {stats, loading } = useExerciseStats()

  const chartData = stats?.dailyWorkouts?.map((entry) => ({
  date: new Date(entry.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
  duration: entry.total_minutes,
})) || []

  // Convierte minutos en formato "Xh Ym"
const formatDuration = (totalMinutes) => {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return `${hours}h ${minutes}m`
}

// Formatea números con separador de miles
const formatNumber = (number) => {
  return number?.toLocaleString('en-US') || 0
}

if (loading) return <p className="text-center text-gray-500">Loading stats...</p>
if (!stats) return <p className="text-center text-red-500">No stats available</p>

return (
  <main>
{loading ? (
  <p className="text-center text-gray-500">Loading stats...</p>
) : stats ? (
  <div className="bg-white rounded-xl shadow p-4 mb-6 border border-gray-200">
    <h2 className="text-lg font-bold text-blue-700 mb-2 text-center">📈 Your Workout Stats</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700 text-sm">
      <p><strong>🧠 Most Frequent Exercise:</strong> {stats.mostCommonExercise}</p>
      <p><strong>📅 Total Workouts:</strong> {formatNumber(stats.totalWorkouts)}</p>
      <p><strong>⏱ Total Duration:</strong> {formatDuration(stats.totalDuration)}</p>
      <p><strong>🏋️ Total Weight Lifted:</strong> {formatNumber(stats.totalWeight)}</p>
      <p><strong>🔥 Most Used Routine:</strong> {stats.mostUsedRoutine}</p>
    </div>

  </div>
) : (
  <p className="text-red-500 text-center">No stats available</p>
 
)}
{stats?.dailyDurations?.length > 0 && (
  <div className="w-full h-64 my-4">
    <h2 className="text-lg font-semibold mb-2 text-center">🗓️ Duración diaria de entrenamientos</h2>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={stats.dailyDurations}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
        <YAxis label={{ value: 'Minutos', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Line type="monotone" dataKey="minutes" stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  </div>
)}
  </main>
)


}

export default ExerciseLogsList