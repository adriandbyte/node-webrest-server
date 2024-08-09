import { TodoDTO } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";

export abstract class TodoRepository {
    abstract getAll(): Promise<TodoEntity[]>;   
    abstract create(todo: TodoDTO): Promise<TodoEntity>;
    abstract updateById(todo: TodoDTO): Promise<TodoEntity>;
    abstract deleteById(id: string): Promise<TodoEntity>;
    abstract findById(id: string): Promise<TodoEntity>;
}