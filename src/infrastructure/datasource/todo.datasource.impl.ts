import { prisma } from "../../data/postgres";
import { TodoDatasource, TodoDTO, TodoEntity } from "../../domain";

export class TodoDataSourceImpl implements TodoDatasource {
  async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany();
    return todos;
  }

  async findById(id: string): Promise<TodoEntity> {
    const todo = await prisma.todo.findUnique({
      where: {
        id: id,
      },
    });
    if (!todo) throw `Todo with id ${id} not found`;
    return todo;
  }
  async create({todo: createTodoDTO}: TodoDTO): Promise<TodoEntity> {
      const createdTodo = await prisma.todo.create({ data: createTodoDTO! });
      if(!createdTodo) throw `Error creating todo`;
      return TodoEntity.fromObject(createdTodo);
  }

  async updateById({todo: updateTodoDTO}: TodoDTO): Promise<TodoEntity> {
    this.findById(updateTodoDTO.id!);
    const updatedTodo = await prisma.todo.update({
      where: {
        id:updateTodoDTO.id,
      },
      data: updateTodoDTO,
    });
    return TodoEntity.fromObject(updatedTodo);
  }

  async deleteById(id: string): Promise<TodoEntity> {
    await this.findById(id);
    const deleted = await prisma.todo.delete({
      where: {
        id,
      },
    });
    return TodoEntity.fromObject(deleted);
  }
}
