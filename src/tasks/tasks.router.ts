import { createValidator } from './tasks.validator';
import { taskController } from './tasks.controller';
import { Router, Request, Response } from 'express';
import { validationResult } from 'express-validator/src/validation-result';

export const tasksRouter: Router = Router();

tasksRouter.get('/tasks', taskController.getAll);

tasksRouter.post(
  '/tasks',
  createValidator,
  async (req: Request, res: Response) => {
    const errors = validationResult(res);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
  },
);
