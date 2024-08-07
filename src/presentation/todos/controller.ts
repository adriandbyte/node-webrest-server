import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { TodoDTO } from "../../domain/dtos/todos/todo.dto";

export class TodosController {
  constructor() {}

  public getTodos = async (req: Request, res: Response) => {
    return res.json(await prisma.todo.findMany());
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const todo = await prisma.todo.findUnique({
      where: {
        id: id,
      },
    });
    if (!todo) {
      return res.status(404).json({ message: `Todo with id ${id} not found` });
    }
    return res.json(todo);
  };

  public createTodo = async (req: Request, res: Response) => {
    const [errors, createTodoDTO] = TodoDTO.validate(req.body);
    if (errors) {
      return res.status(400).json({ message: "Invalid data", errors });
    }
    try {
      const todo = await prisma.todo.create({ data: createTodoDTO!.todo });
      res.status(201).json(todo);
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Internal server error" });
    }
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = req.params.id;
    const todo = await prisma.todo.findUnique({
      where: {
        id: id,
      },
    });
    if (!todo) {
      return res.status(404).json({ message: `Todo with id ${id} not found` });
    }
    const [errors, updateTodoTDO] = TodoDTO.validate(req.body);
    if (errors) {
      return res.status(400).json({ message: "Invalid data", errors });
    }
    try {
      const todo = await prisma.todo.update(
        {
          where: {
            id,
          },
          data: updateTodoTDO!.todo,
        }
      );
      res.status(201).json(todo);
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Internal server error" });
    }
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = req.params.id;
    const todo = await prisma.todo.findFirst({
      where: {
        id,
      },
    });
    if (!todo) {
      return res.status(404).json({ message: `Todo with id ${id} not found` });
    }
    const deleted = await prisma.todo.delete({
      where: {
        id,
      },
    });
    return res.json({ todo, deleted });
  };
}
