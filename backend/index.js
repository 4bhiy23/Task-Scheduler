import 'dotenv/config';
import express from 'express';
import { userRouter } from './routes/user.routes.js';
import { projectRouter } from './routes/project.routes.js';

const app = express();
app.use(express.json());

app.listen(process.env.PORT, ()=> console.log("Server is up and running..."));

app.use('/api/user',userRouter)
app.use('/api/project',projectRouter)