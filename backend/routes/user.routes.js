import express from 'express';
import { addNewUser, getUserInfo, loginUser } from '../controllers/user.controller.js';

export const userRouter = express.Router();

userRouter.post('/signup',addNewUser)
userRouter.post('/login',loginUser)
userRouter.get('/:id',getUserInfo)