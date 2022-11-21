import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { AppDataSource } from './../../index';
import { Task } from './task.entity';

class TaskController {
  // get all tasks method
  public async getAll(
    req: Request,
    res: Response,
  ): Promise<Response> {
    let allTasks: Task[];

    try {
      allTasks = await AppDataSource.getRepository(
        Task,
      ).find({
        order: {
          date: 'ASC',
        },
      });

      allTasks = instanceToPlain(allTasks) as Task[];

      return res.json(allTasks).status(200);
    } catch (_error) {
      console.log(
        'There was an error fetching all tasks ==> ',
        _error,
      );
      return res
        .json({ error: 'Internal Server Error' })
        .status(500);
    }
  }

  // post task method
  public async create(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const errors = validationResult(res);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    const newTask = new Task();

    newTask.title = req.body.title;
    newTask.date = req.body.date;
    newTask.description = req.body.description;
    newTask.priority = req.body.priority;
    newTask.Status = req.body.status;

    let createdTask: Task;

    try {
      createdTask = await AppDataSource.getRepository(
        Task,
      ).save(newTask);

      createdTask = instanceToPlain(createdTask) as Task;

      return res.json(createdTask).status(201);
    } catch (error) {
      console.log(error);
      return res
        .json({ error: 'Internal Server Error' })
        .status(500);
    }
  }
}

export const taskController = new TaskController();
