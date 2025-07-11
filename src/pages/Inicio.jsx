import { useEffect, useState } from "react"
import { format } from 'date-fns' 
import es from 'date-fns/locale/es'
import { useNavigate } from "react-router-dom"
import routinesData from '../data/routinesData'  //ruta de la estructura
import stoicQuotes from '../data/stoicQuotes'

const Inicio = ()=>{ 
    const [user, setUser] = useState('Juan David')
    const [dailyRoutine, setDailyRoutine] = useState(null)
    const navigate = useNavigate()

    const recentWorkouts = routinesData
    .filter(routine => routine.date)
    .sort((a,b)=> new Date(b.date) - new Date(a.date))
    .slice(0,3) //muestra los ultimos 3

    const quoteOfTheDay = stoicQuotes[new Date().getDate() % stoicQuotes.length]

    //simulation of next routine
    useEffect(()=>{
      //puedes cambiar esto con datos reales mas adelante
      const routineMock ={
        id: "legs-glutes",
        name: "legs and Glutes",
        hour: "3:00 AM"
      }
      setDailyRoutine(routineMock)
    },[])

    const today = format(new Date(), "EEEE, d  MMMM y", {locale:es})

    const handleStartRoutine = ()=>{
      navigate('/NewWorkoutLog')
    }

    return (
      <section className="space-y-6">
        <div className="bg-white rounded-xl shadow p-6 mt-4">
          <h1 className="text-xl font-bold text-gray-800">!Hello {user}!</h1>
          <p className="text-sm text-gray-500 capitalize">{today}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
        {dailyRoutine  ?(
          <>
            <p className="text-base font-semibold text-blue-700">{dailyRoutine.name}</p>
            <p className="text-sm text-gray-500 mb-2">Hour: {dailyRoutine.hour}</p>
            <button onClick={handleStartRoutine} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Start Workout</button>
          </>
        ): (
          <p className="text-sm text-gray-500">There is no routine scheduled for today.</p>
        )}
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-2">Recent training</h2>
          {recentWorkouts.map((routine) =>(
            <div key={routine.id} className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm font-medium text-gray-700">{routine.name}</p>
                <p className="text-xs text-gray-500">{format(new Date(routine.date), 'MMM d, yyy',{locale:es})}</p>
              </div>
              <span
              className={`px-2 py-1 text-xs rounded-full font-semibold ${routine.completed ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
              >{routine.completed ? "Completed" : "Missed"}</span>
            </div>
          ))}
        </div>
        <div className="bg-yellow-50 rounded-xl shadow p-6 border border-yellow-200">
          <h2 className="text-lg font-semibold text-yellow-800 mb-2">Stoic Advice of the Day</h2>
          <blockquote className="text-sm italic text-yellow-700">{quoteOfTheDay.quote}</blockquote>
          <p className="text-xs text-yellow-600 mt-1 text-right">-{quoteOfTheDay.author}</p>
        </div>
      </section>
      
  )
}

export default Inicio 