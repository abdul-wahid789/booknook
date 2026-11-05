import { z } from "zod";

export const userSchema = z
    .object({
        name: z
            .string()
            .min(2, "Name must be at least 2 characters.")
            .max(60, "Name cannot exceed 60 characters."),
        email: z.string().email("Please enter a valid email address."),
        image: z.string().url("Please upload a valid image."),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters.")
            .regex(/[A-Z]/, "Include at least one uppercase letter.")
            .regex(/[0-9]/, "Include at least one number."),
        confirmPassword: z.string().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"],
    });

export type TUser = z.infer<typeof userSchema>;