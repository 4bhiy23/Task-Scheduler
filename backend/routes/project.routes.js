import express from 'express';
import { addNewProject, getAllProjects, getProjectById } from '../controllers/project.controller.js';

export const projectRouter = express.Router();

projectRouter.post('/',addNewProject)
projectRouter.get('/all',getAllProjects)
projectRouter.get('/:id',getProjectById)