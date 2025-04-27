import type { NextFunction, Request, Response } from 'express'

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public isOperational: boolean = true
  ) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = isOperational
    Object.setPrototypeOf(this, AppError.prototype)
    Error.captureStackTrace(this, this.constructor)
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404)
  }
}

export class NotAllowed extends AppError {
  constructor(message: string) {
    super(message, 400)
  }
}

export class ValidationError extends AppError {
  constructor(
    message: string,
    public details: Array<{
      field: string
      message: string
      code: string
    }>
  ) {
    super(message, 400)
  }
}

//Global error handler
export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    const payload: any = {
      status: 'error',
      message: err.message,
    }
    if (err instanceof ValidationError) {
      payload.details = err.details
    }

    res.status(err.statusCode).json(payload)
  }

  console.error(err)

  res.status(500).json({
    status: 'error',
    message: 'Something went wrong',
  })
}
