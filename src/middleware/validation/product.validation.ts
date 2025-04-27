import { z } from 'zod'

export const createProductSchema = z
  .object({
    name: z.string().trim().min(1, 'Name is required'),
    description: z.string().min(1, 'Description is required'),
    price: z.number().nonnegative('Price must be a greater than 0'),
    categoryId: z.number().int().positive(),
  })
  .strict()

export const updateProductSchema = z
  .object({
    name: z.string().trim().optional(),
    description: z.string().optional(),
    price: z.number().nonnegative('Price must be greater than 0').optional(),
    categoryId: z.number().int().positive().optional(),
  })
  .strict()

export const productIdParamsSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, { message: 'Id must be a positive number' })
    .transform(Number),
})

export const productsByCategorySchema = z.object({
  categoryId: z
    .string()
    .regex(/^\d+$/, { message: 'CategoryId must be a positive number' })
    .transform(Number),
})
