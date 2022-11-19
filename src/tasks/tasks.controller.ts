import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { AppDataSource } from './../../index';
import { Task } from './task.entity';

class TaskController {
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
}

export const taskController = new TaskController();
