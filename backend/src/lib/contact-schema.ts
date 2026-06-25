import { z } from "zod";

export const contactApiSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(2),
  interest: z.string().min(2),
  message: z.string().min(10),
  website: z.string().optional(),
});

export type ContactApiValues = z.infer<typeof contactApiSchema>;
