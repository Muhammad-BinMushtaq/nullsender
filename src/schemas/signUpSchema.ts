import z  from 'zod'

export const userNameValidation = z
    .string()
    .min(2, "Minimum 2 character are required")
    .max(20, "No more than 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers and underscores allowed")


export const signUpSchema = z.object({
    username: userNameValidation,
    email: z.string().email({ message: "invalid email address" }),
    password: z.string().min(6, { message: "minimum 6 characters are required for password" })

})