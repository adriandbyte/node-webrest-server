import { z } from "zod";

const iso8601DateTimeRegex =
  /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?([+-]\d{2}:\d{2}|Z)?)$/;

export const todoSchemaValidator = z.object({
  id: z.string().optional(),
  text: z.string().min(1),
  completed: z
    .string()
    .refine((val) => iso8601DateTimeRegex.test(val), {
      message:
        "Invalid date format. Please provide a valid ISO 8601 date string.",
    })
    .optional(),
});

export type TodoValidatorT = z.infer<typeof todoSchemaValidator>;
