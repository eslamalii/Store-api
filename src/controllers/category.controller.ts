import { asyncHandler } from '../middleware/asyncHandler'
import type { Request, Response } from 'express'
import type { ICategoryService } from '../interfaces/ICategoryService'
import { NotFoundError } from '../middleware/errorHandler'

export class CategoryController {
  constructor(private readonly categoryService: ICategoryService) {}

  getAllCategories = asyncHandler(async (req: Request, res: Response) => {
    const categories = await this.categoryService.findAll()

    if (!categories) {
      throw new NotFoundError('Categories Not Found')
    }

    res.status(200).json(categories)
  })

  getCategoryById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = res.locals.validatedData.params

    const category = await this.categoryService.findById(id)

    if (!category) {
      throw new NotFoundError('Category Not Found')
    }

    res.status(200).json(category)
  })

  createCategory = asyncHandler(async (req: Request, res: Response) => {
    const data = res.locals.validatedData.body

    const category = await this.categoryService.create(data)

    res.status(201).json(category)
  })

  updateCategory = asyncHandler(async (req: Request, res: Response) => {
    const { id } = res.locals.validatedData.params
    const data = res.locals.validatedData.body

    const category = await this.categoryService.update(id, data)

    res.status(200).json(category)
  })

  deleteCategory = asyncHandler(async (req: Request, res: Response) => {
    const { id } = res.locals.validatedData.params

    await this.categoryService.delete(id)

    res.status(204).json({
      message: 'Category deleted successfully',
    })
  })
}
