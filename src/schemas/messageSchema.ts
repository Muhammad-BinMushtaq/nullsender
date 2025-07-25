import z from 'zod'

export const messageSchema = z.object({
    content: z.string()
        .min(10, { message: "At least 10 characters are required" })
        .max(300, "NO more than 300 chracters are allowed"),

        
})