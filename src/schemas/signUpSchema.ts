import z, { email, minLength } from 'zod'

export const userNameValidation = z
    .string()
    .min(2, "Minimum 2 character are required")
    .max(20, "No more than 20 characters")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "No special chraters allowed")

export const userSchemaValidation = z.object({
    userName: userNameValidation,
    email: z.string().email({ message: "invalid email address" }),
    password: z.string().min(6, { message: "minimum 6 characters are required for password" })
    
})