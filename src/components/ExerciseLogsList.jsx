import useExerciseStats from "./useExerciseStats"

const ExerciseLogsList = () => {
  const {stats, loading } = useExerciseStats()

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
      <p><strong>🏋️ Total Weight Lifted:</strong> {formatNumber(stats.totalWeight)} kg</p>
      <p><strong>🔥 Most Used Routine:</strong> {stats.mostUsedRoutine}</p>
    </div>
  </div>
) : (
  <p className="text-red-500 text-center">No stats available</p>
)}
  </main>
)


}

export default ExerciseLogsList