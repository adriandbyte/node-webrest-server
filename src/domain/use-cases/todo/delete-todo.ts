import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

export interface DeleteTodoUseCase {
  execute(id: string): Promise<TodoEntity>;
}

export class DeleteTodo implements DeleteTodoUseCase {
  constructor(public readonly todoRepository: TodoRepository) {}
  execute(id: string): Promise<TodoEntity> {
    return this.todoRepository.deleteById(id);
  }
}
