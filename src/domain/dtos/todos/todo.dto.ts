import { ZodIssue } from "zod";
import {
  createTodoSchemaValidator,
  CreateTodoValidatorT,
  updateTodoSchemaValidator,
  UpdateTodoValidatorT,
} from "../../../zodSchemas/todos/todo";

export class TodoDTO {
  private constructor(
    public readonly todo: CreateTodoValidatorT | UpdateTodoValidatorT
  ) {}

  static validateCreateTodo(props: {
    [key: string]: any;
  }): [ZodIssue[] | null, TodoDTO | undefined] {
    const result = createTodoSchemaValidator.safeParse(props);
    if (!result.success) {
      return [result.error.errors, undefined];
    }
    return [null, new TodoDTO(result.data)];
  }
  static validateUpdateTodo(props: {
    [key: string]: any;
  }): [ZodIssue[] | null, TodoDTO | undefined] {
    const result = updateTodoSchemaValidator.safeParse(props);
    if (!result.success) {
      return [result.error.errors, undefined];
    }
    return [null, new TodoDTO(result.data)];
  }
}
