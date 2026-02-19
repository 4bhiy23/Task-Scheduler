import 'dotenv/config';
import express from 'express';
import { userRouter } from './routes/user.routes.js';
import { projectRouter } from './routes/project.routes.js';
import { projectDeveloperRouter } from './routes/projectDeveloper.routes.js';
import { taskRouter } from './routes/task.routes.js';

const app = express();
app.use(express.json());

app.use('/api/user',userRouter)
app.use('/api/project',projectRouter)
app.use('/api/project-developers',projectDeveloperRouter)
app.use('/api/task', taskRouter);




app.listen(process.env.PORT ?? 8000, ()=> console.log("Server is up and running..."));