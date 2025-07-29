
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import supabase from './supabaseClient.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Ruta base
app.get('/', (req,res) =>{
    res.send('🚀 API is running with Supabase SDK!!')
})

// 1. Obtener todas las rutinas (filtradas por user_id si se envía)
app.get('/routines', async (req, res) => {
  const { user_id } = req.query

  let query = supabase.from('routines').select('*').order('id')

  if (user_id) {
    query = query.eq('user_id', user_id)
  }

  const { data, error } = await query

  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
})

// 2. Crear una nueva rutina
app.post('/routines',async(req,res)=>{
    const {name,focus,duration,exercises,date,completed} = req.body

    const {data, error} = await supabase
    .from('routines')
    .insert([ {name, focus, duration, exercises, date, completed}])
    .select()
    if (error) return res.status(500).json({error:  error.message})
    res.status(201).json(data[0])
})

// 3. actualizar rutina
app.put('/routines/:id', async (req,res)=>{
    const {id} = req.params
    const { name, focus, duration, exercises} = req.body

    const { data, error } = await supabase
    .from('routines')
    .update({name, focus, duration, exercises})
    .eq('id', id)
    .select()

    if (error) return res.status(500).json({error:  error.message})
    res.status(201).json(data[0])
})

//4. Eliminar rutina
app.delete('/routines/:id', async (req, res) => {
  const { id } = req.params

  const { error } = await supabase
    .from('routines')
    .delete()
    .eq('id', id)

  if (error) return res.status(500).json({ error: error.message })
  res.status(204).send()
})

// 5. Crear un nuevo workout log
app.post('/workout_logs', async (req, res) => {
  const { user_id, date, routine_id, duration_minutes, notes } = req.body

  const { data, error } = await supabase
    .from('workout_logs')
    .insert([{ user_id, date, routine_id, duration_minutes, notes }])
    .select()

  if (error) return res.status(500).json({ error: error.message })
  res.status(201).json(data[0])
})

// 6. Obtener todos los workout logs con el conteo de ejercicios
app.get('/workout_logs', async (req, res) => {
  const { user_id } = req.query;

  // Obtener todos los workout logs
  let { data: logs, error: logsError } = await supabase
    .from('workout_logs')
    .select('*')
    .order('date', { ascending: false });

  if (logsError) return res.status(500).json({ error: logsError.message });

  // Filtrar por usuario si se proporciona
  if (user_id) {
    logs = logs.filter(log => log.user_id === user_id);
  }

  // Obtener todos los exercise_logs
  const { data: exerciseLogs, error: exerciseError } = await supabase
    .from('exercise_logs')
    .select('workout_log_id, exercise_name, sets, reps, weight_kg');

  if (exerciseError) return res.status(500).json({ error: exerciseError.message });

  // Agregar exercise_count y exercises a cada workout_log
  const logsConEjercicios = logs.map(log => {
    const exercises = exerciseLogs.filter(e => e.workout_log_id === log.id);
    return {
      ...log,
      exercise_count: exercises.length,
      exercises: exercises.map(e => ({
        exercise_name: e.exercise_name,
        sets: e.sets,
        reps: e.reps,
        weight_kg: e.weight_kg
      }))
    };
  });

  res.json(logsConEjercicios);
});

// 7. Crear un nuevo registro de ejercicio (exercise_log)
app.post('/exercise_logs', async (req, res) => {
  const {
    workout_log_id,
    exercise_name,
    sets,
    reps,
    weight_kg,
    rest_seconds,
    notes
  } = req.body

  const { data, error } = await supabase
    .from('exercise_logs')
    .insert([
      {
        workout_log_id,
        exercise_name,
        sets,
        reps,
        weight_kg,
        rest_seconds,
        notes
      }
    ])
    .select()

  if (error) return res.status(500).json({ error: error.message })
  res.status(201).json(data[0])
})

// 8. Obtener todos los registros de ejercicios (opcional: filtrar por workout_log_id)
app.get('/exercise_logs', async (req, res) => {
  const { workout_log_id } = req.query

  let query = supabase.from('exercise_logs').select('*').order('created_at', { ascending: false })

  if (workout_log_id) {
    query = query.eq('workout_log_id', workout_log_id)
  }

  const { data, error } = await query

  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
})

//iniciar servidor

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})