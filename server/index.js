
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

// 1. Obtener todas las rutinas
app.get('/routines', async (req,res) =>{
    const {data, error} = await supabase
    .from('routines')
    .select('*')
    .order('id')
        
    if (error) return res.status(500).json({ error: error.message})
    res.json(data)
})

// 2. Crear una nueva rutina
app.post('/routines',async(req,res)=>{
    const {name,focus,duration,exercises} = req.body

    const {data, error} = await supabase
    .from('routines')
    .insert([ {name, focus, duration, exercises}])
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

//iniciar servidor

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})