import useExerciseStats from '../components/useExerciseStats'

const Estadisticas = () => {
  const {stats, loading } = useExerciseStats()

  if (loading) return <p className="p-4">Loading stats...</p>
  if (!stats) return <p className="p-4 text-red-500">No stats available</p>


  return (
        <main className="p-4">
      <h1 className="text-xl font-bold text-blue-600">Statistics</h1>
      <p className="text-sm text-gray-500 mb-4">Track your improvements and metrics.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatBox label="Total Workouts" value={stats.totalWorkouts} />
        <StatBox label="Total Time (min)" value={stats.totalDuration} />
        <StatBox label="Total Weight Lifted (kg)" value={Math.round(stats.totalWeight)} />
        <StatBox label="Most Frequent Exercise" value={stats.mostCommonExercise} />
        <StatBox label="Most Used Routine" value={stats.mostUsedRoutine} />
      </div>
    </main>
  )
}

const StatBox = ({ label, value }) => (
  <div className="bg-white shadow rounded-lg p-4 border">
    <h3 className="text-sm text-gray-500">{label}</h3>
    <p className="text-lg font-semibold text-blue-600">{value}</p>
  </div>
)

export default Estadisticas