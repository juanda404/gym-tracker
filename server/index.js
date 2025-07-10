const express = require('express')
const cors = require('cors')
const pool = require('./db')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/', (req,res) =>{
    res.send('🚀 API is running')
})

// Nueva ruta para obtener rutinas
app.get('/routines', async (req,res) =>{
    try{
        const result = await pool.query('SELECT * FROM routines ORDER BY id')
        res.json(result.rows)
    }catch(err){
        console.error(err.message)
        res.status(500).send('Error retrieving routines')
    }
})

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})