import WorkoutLogsList from '../components/WorkoutLogsList'

const History = () => {
    return (
    <main className="p-4">
      <h1 className="text-xl font-bold text-blue-600">Workout History</h1>
      <p className="text-sm text-gray-500">Review your progress and consistency.</p>
      <WorkoutLogsList/>
    </main>
  )
}
export default History