import express from "express";
const app = express()
import cors from "cors"

app.use(express.json())
app.use(express.urlencoded({ extended:true }))

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

// Routes import
import projectRouter from './routes/projectsRouter.js'

// Routes Decleration
app.use('/api/v1/projects', projectRouter)

export default app