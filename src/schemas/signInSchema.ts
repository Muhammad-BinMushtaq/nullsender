import z, { string } from 'zod'

export const signInSchema = z.object({
    identifier: string(),
    password: string()
})
