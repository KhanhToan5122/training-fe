import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "Please fill out this field."),
  password: z.string().min(1, "Please fill out this field."),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
