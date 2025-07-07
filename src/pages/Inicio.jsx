import { useEffect, useState } from "react"
import { format } from 'date-fns' 
import es from 'date-fns/locale/es'
import { useNavigate } from "react-router-dom"

const Inicio = ()=>{ 
    const [user, setUser] = useState('Juan David')
    const [dailyRoutine, setDailyRoutine] = useState(null)
    const navigate = useNavigate()

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
      if(dailyRoutine?.id){
        navigate(`/rutinas/${dailyRoutine.id}`)
      }
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
            <button onClick={handleStartRoutine}>Start Workout</button>
          </>
        ): (
          <p className="text-sm text-gray-500">There is no routine scheduled for today.</p>
        )}
        </div>
      </section>
  )
}

export default Inicio 