import { z } from "zod";

const iso8601DateTimeRegex =
  /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?([+-]\d{2}:\d{2}|Z)?)$/;


// Define the common schema without the id field
const baseTodoSchema = z.object({
  text: z.string().min(1),
  completed: z
    .string()
    .refine((val) => iso8601DateTimeRegex.test(val), {
      message:
        "Invalid date format. Please provide a valid ISO 8601 date string.",
    })
    .optional(),
});

// Define the schema for creating a new todo (id is optional)
export const createTodoSchemaValidator = baseTodoSchema.extend({
  id: z.string().optional(),
});

// Define the schema for updating an existing todo (id is required)
export const updateTodoSchemaValidator = baseTodoSchema.extend({
  id: z.string(), // id is required for updates
});

export type CreateTodoValidatorT = z.infer<typeof createTodoSchemaValidator>;
export type UpdateTodoValidatorT = z.infer<typeof updateTodoSchemaValidator>;