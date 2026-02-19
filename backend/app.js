import express from "express";
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended:true }))

// Routes import
import projectRouter from './routes/projectsRouter.js'

// Routes Decleration
app.use('/api/v1/projects', projectRouter)

export default app