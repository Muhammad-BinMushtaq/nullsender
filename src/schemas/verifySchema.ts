import z, { string } from 'zod'

export const verifySchema = z.object({
    code: string().length(6, "Code must be 6 digits long")
})
