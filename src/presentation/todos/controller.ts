import { Request, Response } from "express";
import { TodoDTO } from "../../domain/dtos/todos/todo.dto";
import {
  CreateTodo,
  DeleteTodo,
  GetTodo,
  GetTodos,
  TodoRepository,
  UpdateTodo,
} from "../../domain";
export class TodosController {
  constructor(private readonly todoRepository: TodoRepository) {}

  public getTodos = (req: Request, res: Response) => {
    new GetTodos(this.todoRepository)
      .execute()
      .then((todos) => res.status(200).json(todos))
      .catch((error) => res.status(404).json({ message: error }));
  };

  public getTodoById = (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) return res.status(400).json({ message: "Id is required" });

    new GetTodo(this.todoRepository)
      .execute(id)
      .then((todo) => res.status(200).json(todo))
      .catch((error) => res.status(404).json({ message: error }));
  };

  public createTodo = (req: Request, res: Response) => {
    const [validationErrors, createTodoDTO] = TodoDTO.validateCreateTodo(
      req.body
    );
    if (validationErrors) {
      return res
        .status(400)
        .json({ message: "Invalid data", validationErrors });
    }

    new CreateTodo(this.todoRepository)
      .execute(createTodoDTO!)
      .then((todo) => res.status(201).json(todo))
      .catch((error) => res.status(404).json({ message: error }));
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = req.params.id;
    const [validationErrors, updateTodoTDO] = TodoDTO.validateUpdateTodo({
      ...req.body,
      id,
    });
    if (validationErrors) {
      return res
        .status(400)
        .json({ message: "Invalid data", validationErrors });
    }
    new UpdateTodo(this.todoRepository)
      .execute(updateTodoTDO!)
      .then((todo) => res.status(200).json(todo))
      .catch((error) => res.status(404).json({ message: error }));
  };

  public deleteTodo = (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }
    new DeleteTodo(this.todoRepository)
      .execute(id)
      .then(() => res.status(204).send())
      .catch((error) => res.status(404).json({ message: error }));
  };
}
