import z from "zod";

export const signupBody = z.object({
  firstName: z.string().trim(),
  lastName: z.string().trim().optional(),
  email: z.email().trim(),
  password: z.string().min(6).trim(),
});

export const signinBody = z.object({
  email: z.email().trim(),
  password: z.string().min(6).trim(),
});



