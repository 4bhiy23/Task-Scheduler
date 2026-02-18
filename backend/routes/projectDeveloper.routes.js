import express from 'express';
import { 
    addDeveloperToProject, 
    removeDeveloperFromProject, 
    getProjectDevelopers, 
    getUserProjects 
} from '../controllers/projectDeveloper.controller.js';

export const projectDeveloperRouter = express.Router();

projectDeveloperRouter.post('/', addDeveloperToProject);
projectDeveloperRouter.delete('/', removeDeveloperFromProject);
projectDeveloperRouter.get('/project/:projectId', getProjectDevelopers);
projectDeveloperRouter.get('/user/:userId', getUserProjects);
