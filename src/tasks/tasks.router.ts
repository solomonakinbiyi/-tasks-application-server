import { createValidator } from './tasks.validator';
import { taskController } from './tasks.controller';
import { Router } from 'express';

export const tasksRouter: Router = Router();

tasksRouter.get('/tasks', taskController.getAll);

tasksRouter.post(
  '/tasks',
  createValidator,
  taskController.create,
);
