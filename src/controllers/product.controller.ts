import type { Request, Response } from 'express'
import type { IProductService } from '../interfaces/IProductService'
import { asyncHandler } from '../middleware/asyncHandler'
import { NotFoundError } from '../middleware/errorHandler'

export class ProductController {
  constructor(private readonly productService: IProductService) {}

  getAllProducts = asyncHandler(async (req: Request, res: Response) => {
    const products = await this.productService.findAll()

    if (!products) {
      throw new NotFoundError('Products Not Found')
    }

    res.status(200).json(products)
  })

  getProductById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = res.locals.validatedData.params
    const product = await this.productService.findById(id)

    if (!product) {
      throw new NotFoundError('Product Not Found')
    }

    res.status(200).json(product)
  })

  createProduct = asyncHandler(async (req: Request, res: Response) => {
    const data = res.locals.validatedData.body
    const product = await this.productService.create(data)

    res.status(201).json(product)
  })

  updateProduct = asyncHandler(async (req: Request, res: Response) => {
    const { id } = res.locals.validatedData.params
    const data = res.locals.validatedData.body

    const product = await this.productService.update(id, data)

    res.status(200).json(product)
  })

  deleteProduct = asyncHandler(async (req: Request, res: Response) => {
    const { id } = res.locals.validatedData.params

    await this.productService.delete(id)

    res.status(204).json({
      message: 'Product deleted successfully',
    })
  })

  getProductsByCategory = asyncHandler(async (req: Request, res: Response) => {
    const { categoryId } = res.locals.validatedData.params
    const products = await this.productService.findProductsByCategory(
      categoryId
    )

    res.status(200).json(products)
  })
}
