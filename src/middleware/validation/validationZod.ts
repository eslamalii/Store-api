import type { Request, Response } from 'express'
import type { ZodTypeAny } from 'zod'
import { ValidationError } from '../errorHandler'

export const validationZod = (
  schema: ZodTypeAny,
  property: 'body' | 'params'
) => {
  return (req: Request, res: Response, next: Function) => {
    const result = schema.safeParse(req[property])

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
        code: issue.code,
      }))

      return next(new ValidationError('Validation Failed', errors))
    }

    res.locals.validatedData = {
      ...(res.locals.validatedData ?? {}),
      [property]: result.data,
    }

    next()
  }
}
