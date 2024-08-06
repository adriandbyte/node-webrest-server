import { Request, Response } from "express";

const todos = [
  { id: 1, text: "Buy milk", done: false },
  { id: 2, text: "Buy bread", done: true },
  { id: 3, text: "Buy butter", done: false },
];

export class TodosController {
  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    return res.json(todos);
  };

  public getTodoById(req: Request, res: Response) {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json({ message: "Invalid id" });
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) {
      return res.status(404).json({ message: `Todo with id ${id} not found` });
    }
    return res.json(todo);
  }

  public createTodo = (req: Request, res: Response) => {
    const { text, done } = req.body;
    if (!text) return res.status(400).json({ message: "Text is required" });
    const newTodo = { id: todos.length + 1, text, done: done || false };
    todos.push(newTodo);
    return res.status(201).json(newTodo);
  }

  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json({ message: "Invalid id" });
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) {
      return res.status(404).json({ message: `Todo with id ${id} not found` });
    }
    const { text, done } = req.body;
    if (text) todo.text = text;
    if (done) todo.done = done;
    return res.json(todo);
  }

  public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json({ message: "Invalid id" });
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) {
      return res.status(404).json({ message: `Todo with id ${id} not found` });
    }
    todos.splice(todoIndex, 1);
    return res.status(204).json();
  }
}
