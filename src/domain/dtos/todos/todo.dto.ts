import { ZodIssue } from "zod";
import { TodoValidatorT, todoSchemaValidator } from "../../../zodSchemas/todos/todo";

export class TodoDTO {
  private constructor(public readonly todo: TodoValidatorT) {}

  static validate(props: {
    [key: string]: any;
  }): [ZodIssue[] | null, TodoDTO | undefined] {
    const result = todoSchemaValidator.safeParse(props);
    if (!result.success) {
      return [result.error.errors, undefined];
    }
    return [null, new TodoDTO(result.data)];
  }
}
