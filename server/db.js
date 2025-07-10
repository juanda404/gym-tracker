import dotenv from 'dotenv'
import pg from 'pg'

dotenv.config()
const { Pool } = pg

const pool = new Pool({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    ssl:{
        rejectUnauthorized: false,
    },
})

export const query = (text, params) => pool.query(text, params)
