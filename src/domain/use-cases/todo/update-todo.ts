import { TodoDTO } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

export interface UpdateTodoUseCase {
  execute(updateTodoDTO: TodoDTO): Promise<TodoEntity>;
}

export class UpdateTodo implements UpdateTodoUseCase {
  constructor(public readonly todoRepository: TodoRepository) {}
  execute(updateTodoDTO: TodoDTO): Promise<TodoEntity> {
    return this.todoRepository.updateById(updateTodoDTO);
  }
}
