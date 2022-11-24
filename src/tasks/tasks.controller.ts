import {
  instanceToPlain,
  plainToInstance,
} from 'class-transformer';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { UpdateResult } from 'typeorm';
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
        'There was an error while fetching all tasks ==> ',
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
    } catch (_error) {
      console.log(
        'There was an error while creating a task ==> ',
        _error,
      );
      return res
        .json({ error: 'Internal Server Error' })
        .status(500);
    }
  }

  // update task
  public async update(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const errors = validationResult(res);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    let task: Task | null;

    try {
      task = await AppDataSource.getRepository(
        Task,
      ).findOne({
        where: { id: req.body.id },
      });

      if (!task) {
        return res.status(404).json({
          error:
            'The task with the given Id does not exist',
        });
      }

      let updatedTask: UpdateResult;

      updatedTask = await AppDataSource.getRepository(
        Task,
      ).update(
        req.body.id,
        plainToInstance(Task, {
          Status: req.body.status,
        }),
      );

      updatedTask = instanceToPlain(
        updatedTask,
      ) as UpdateResult;

      return res.json(updatedTask).status(200);
    } catch (_error) {
      console.log(
        'There was an error while updating a task ==> ',
        _error,
      );
      return res
        .json({ error: 'Internal Server Error' })
        .status(500);
    }
  }
}

export const taskController = new TaskController();