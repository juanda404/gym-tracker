import { useEffect, useState } from "react"
import { format } from 'date-fns' 
import es from 'date-fns/locale/es'
import { useNavigate } from "react-router-dom"
import { supabase } from '../supabase/client'
import { useUser } from '@supabase/auth-helpers-react'
import stoicQuotes from '../data/stoicQuotes'

const Inicio = () => {
  const user = useUser()
  const [dailyRoutine, setDailyRoutine] = useState(null)
  const [recentWorkouts, setRecentWorkouts] = useState([])
  const navigate = useNavigate()

  const today = new Date().toISOString().split("T")[0] // Resultado: '2025-07-23'
  const quoteOfTheDay = stoicQuotes[new Date().getDate() % stoicQuotes.length]

  useEffect(() => {
    if (!user) return

    const fetchWorkoutData = async () => {
      const { data, error } = await supabase
        .from('workout_logs')
        .select(`
          id,
          created_at,
          routines(focus, completed)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(3)

      if (error) {
        console.error("❌ Error fetching workouts:", error)
        return
      }

      if (data && data.length > 0) {
        setRecentWorkouts(data)

        const todayRoutine = data.find(log => {
             const logDate = new Date(log.created_at).toISOString().split("T")[0]
               return logDate === today
              })

        if (todayRoutine) {
          setDailyRoutine({
            id: todayRoutine.id,
            name: todayRoutine.routines?.focus || "Unnamed Routine",
            hour: "5:00 AM" // Opcional: puedes ajustar si lo guardas en la BD
          })
        }
      }
    }

    fetchWorkoutData()
  }, [user])

  const handleStartRoutine = () => {
     if (dailyRoutine?.id) {
    navigate(`/workout/${dailyRoutine.id}`) // o como hayas definido la ruta
  } else {
    navigate('/NewWorkoutLog') // para crear uno nuevo si no hay rutina hoy
  }
  }

  return (
    <section className="space-y-6">
      <div className="bg-white rounded-xl shadow p-6 mt-4">
        <h1 className="text-xl font-bold text-gray-800">
          ¡Hola {user?.user_metadata?.full_name || "Atleta"}!
        </h1>
        <p className="text-sm text-gray-500 capitalize">{today}</p>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        {dailyRoutine ? (
          <>
            <p className="text-base font-semibold text-blue-700">{dailyRoutine.name}</p>
            <p className="text-sm text-gray-500 mb-2">Hora: {dailyRoutine.hour}</p>
            <button onClick={handleStartRoutine} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Start Workout
            </button>
          </>
        ) : (
          <>
          <p className="text-sm text-gray-500">There is no routine scheduled for today.</p>
          
          <button onClick={handleStartRoutine} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Start Workout
            </button>
          </>
          
        )}
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-2">Recent Training</h2>
        {recentWorkouts.map((routine) => (
           <div key={routine.id} className="flex items-center justify-between mb-2">
           <div>
                <p className="text-sm font-medium text-gray-700">{routine.routines?.focus || "Sin nombre"}</p>
                <p className="text-xs text-gray-500">
                  {format(new Date(routine.created_at), 'yyyy-MM-dd')}
                </p>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full font-semibold ${routine.routines?.completed ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                {routine.routines?.completed ? "Completado" : "Pendiente"}
              </span>
            </div>
        ))}
      </div>

      <div className="bg-yellow-50 rounded-xl shadow p-6 border border-yellow-200">
        <h2 className="text-lg font-semibold text-yellow-800 mb-2">Consejo estoico del día</h2>
        <blockquote className="text-sm italic text-yellow-700">{quoteOfTheDay.quote}</blockquote>
        <p className="text-xs text-yellow-600 mt-1 text-right">-{quoteOfTheDay.author}</p>
      </div>
    </section>
  )
}

export default Inicio