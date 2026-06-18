import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  company: z.string().min(2, "Company is required"),
  interest: z.string().min(2, "Select a service"),
  message: z.string().min(10, "Share a brief summary of your goals"),
  website: z.string().optional(),
});

export const contactApiSchema = contactFormSchema.extend({
  recaptchaToken: z.string().min(1, "Missing reCAPTCHA token"),
  website: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type ContactApiValues = z.infer<typeof contactApiSchema>;
