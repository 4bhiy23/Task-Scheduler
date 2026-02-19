import express from 'express';
import { addTask, getTasksByProject } from '../controllers/task.controller.js';

export const taskRouter = express.Router();

taskRouter.post('/', addTask);
taskRouter.get('/project/:projectId', getTasksByProject);
