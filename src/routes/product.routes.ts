import { Router } from 'express'
import { ProductController } from '../controllers/product.controller'
import { productService } from '../config/db'
import { validationZod } from '../middleware/validation/validationZod'
import {
  createProductSchema,
  productIdParamsSchema,
  productsByCategorySchema,
  updateProductSchema,
} from '../middleware/validation/product.validation'

const route = Router()
const productController = new ProductController(productService)

route.get('/', productController.getAllProducts)
route.get(
  '/:id',
  validationZod(productIdParamsSchema, 'params'),
  productController.getProductById
)
route.post(
  '/',
  validationZod(createProductSchema, 'body'),
  productController.createProduct
)
route.put(
  '/:id',
  validationZod(productIdParamsSchema, 'params'),
  validationZod(updateProductSchema, 'body'),
  productController.updateProduct
)
route.delete(
  '/:id',
  validationZod(productIdParamsSchema, 'params'),
  productController.deleteProduct
)
route.get(
  '/category/:categoryId',
  validationZod(productsByCategorySchema, 'params'),
  productController.getProductsByCategory
)

export default route
