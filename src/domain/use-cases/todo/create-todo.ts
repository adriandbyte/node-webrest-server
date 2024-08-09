import { TodoDTO } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

export interface CreateTodoUseCase {
  execute(createTodoDTO: TodoDTO): Promise<TodoEntity>;
}

export class CreateTodo implements CreateTodoUseCase {
  constructor(public readonly todoRepository: TodoRepository) {}
  execute(createTodoDTO: TodoDTO): Promise<TodoEntity> {
    return this.todoRepository.create(createTodoDTO);
  }
}