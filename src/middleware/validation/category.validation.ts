import { z } from 'zod'

export const categoryNameSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
})

export const categoryIdParamsSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, { message: 'Id must be a positive number' })
    .transform(Number),
})
