import {
  TodoDTO,
  TodoEntity,
  TodoRepository,
} from "../../domain";
import { TodoDataSourceImpl } from "../datasource/todo.datasource.impl";

export class TodoRepositoryImpl implements TodoRepository {
  constructor(public readonly datasource: TodoDataSourceImpl) {}
  getAll(): Promise<TodoEntity[]> {
    return this.datasource.getAll();
  }
  create(createTodoDTO: TodoDTO): Promise<TodoEntity> {
    return this.datasource.create(createTodoDTO);
  }
  updateById(updateTodoDTO: TodoDTO): Promise<TodoEntity> {
    return this.datasource.updateById(updateTodoDTO);
  }
  deleteById(id: string): Promise<TodoEntity> {
    return this.datasource.deleteById(id);
  }
  findById(id: string): Promise<TodoEntity> {
    return this.datasource.findById(id);
  }
}
