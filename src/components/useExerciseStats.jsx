import { useEffect, useState } from "react"
import { supabase } from '../supabase/client'
import { useUser } from '@supabase/auth-helpers-react'

export default function useExerciseStats() {
  const user = useUser()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user === undefined) return // Todavía cargando el usuario
    if (!user) {
      console.warn("No hay usuario autenticado.")
      setStats(null)
      setLoading(false)
      return
    }

    const fetchStats = async () => {
      setLoading(true)

      const { data, error } = await supabase
        .from('workout_logs')
        .select(`
          id,
          date,
          duration_minutes,
          routine_id,
          routines(name),
          exercise_logs(exercise_name, sets, reps, weight_kg)
        `)
        .eq('user_id', user.id)

      if (error) {
        console.error('❌ Error fetching stats:', error)
        setStats(null)
        setLoading(false)
        return
      }

      if (!data || data.length === 0) {
        setStats({
          totalWorkouts: 0,
          totalDuration: 0,
          totalWeight: 0,
          mostCommonExercise: 'N/A',
          mostUsedRoutine: 'N/A',
        })
        setLoading(false)
        return
      }

      // Cálculos
      const totalWorkouts = data.length
      const rawTotalDuration = data.reduce((acc, workout) => acc + (workout.duration_minutes || 0), 0)
      const hours = Math.floor(rawTotalDuration / 60)
      const minutes = rawTotalDuration % 60
      const totalDurationFormatted = `${hours}h ${minutes}m`

      let totalWeight = 0
      const exerciseCount = {}
      const routineCount = {}
      const dailyDurations = {}

      data.forEach(workout => {
        // Peso total
        workout.exercise_logs?.forEach(ex => {
          const sets = ex.sets || 0
          const reps = ex.reps || 0
          const weight = ex.weight_kg || 0
          totalWeight += sets * reps * weight

          if (ex.exercise_name) {
            exerciseCount[ex.exercise_name] = (exerciseCount[ex.exercise_name] || 0) + 1
          }
        })

        // Rutina más usada
        const routineName = workout.routines?.name
        if (routineName) {
          routineCount[routineName] = (routineCount[routineName] || 0) + 1
        }
        // Duración por día
        const date = new Date(workout.date).toISOString().split('T')[0]
        dailyDurations[date] = (dailyDurations[date] || 0) + (workout.duration_minutes || 0)
      })

      const mostCommonExercise = Object.entries(exerciseCount).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'
      const mostUsedRoutine = Object.entries(routineCount).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'

      // Convertir dailyDurations a array para gráfica
      const dailyDurationArray = Object.entries(dailyDurations).map(([date, minutes]) => ({
        date,
        minutes,
      })).sort((a, b) => new Date(a.date) - new Date(b.date))

      
      setStats({
        totalWorkouts,
        totalDuration: rawTotalDuration,
        totalDurationFormatted,
        totalWeight: totalWeight.toLocaleString() + ' kg',
        mostCommonExercise,
        mostUsedRoutine,
        dailyDurations: dailyDurationArray,
      })

      setLoading(false)
    }

    fetchStats()
  }, [user])

  return { stats, loading }
}
