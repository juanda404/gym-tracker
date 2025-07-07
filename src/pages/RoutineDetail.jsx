import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const RoutineDetail = () =>{
    const {id} = useParams()
    const [routine, setRoutine ] = useState(null)

    useEffect(()=>{
        const storedRoutines = localStorage.getItem('routines')
        if (storedRoutines) {
            const routines = JSON.parse(storedRoutines)
            const found = routines.find(r => r.id.toString() === id)
            setRoutine(found)
        }
    },[id])

    if(!routine) return <p>Loading ....</p>

    return(
        <div>
            <h1>{routine.name}</h1>
            <p>{routine.description}</p>

            <h2>Exercise: </h2>
            <ul>
                {routine.exercises?.map((exercise, index)=>(
                    <li key={index}>{exercise}</li>
                ))}
            </ul>
            <p>Duration:  {routine.duration} min</p>
        </div>
    )
}
export default RoutineDetail