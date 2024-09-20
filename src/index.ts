
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db/connection';
import studentRoutes from './routes/studentRoutes'

dotenv.config()

const app = express()

app.use(express.json()) 
app.use(cors())

const port = process.env.PORT || 3000

connectDB();

app.use('/api', studentRoutes )

app.get("/", (req,res) => {
    res.send('hello world')
})

app.listen(port, () => {
    console.log(`server is running at port number ${port}`)
})