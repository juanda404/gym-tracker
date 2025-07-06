import routinesData from "../data/routinesData"
import RoutineCard from "../components/RoutineCard"

const Rutines = () => {
    return (
    <main className="p-4">
      <h1 className="text-xl font-bold text-blue-600">Workout Routines</h1>
      {routinesData.map((routine)=>(
        <RoutineCard key={routine.id} routine={routine}/>
      ))}
    </main>
  )
}
export default Rutines 