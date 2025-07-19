import WorkoutLogsList from '../components/WorkoutLogsList'


const History = () => {
    return (
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-blue-600 text-center mb-4">📊 Workout History</h1>


      {/* Lista de logs */}
      <WorkoutLogsList/>
    </main>
  )
}
export default History