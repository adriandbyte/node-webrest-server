import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

export interface GetTodoUseCase {
  execute(id: string): Promise<TodoEntity>;
}

export class GetTodo implements GetTodoUseCase {
  constructor(public readonly todoRepository: TodoRepository) {}
  execute(id: string): Promise<TodoEntity> {
    return this.todoRepository.findById(id);
  }
}
