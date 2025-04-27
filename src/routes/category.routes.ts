import { Router } from 'express'
import { CategoryController } from '../controllers/category.controller'
import { categoryService } from '../config/db'
import { validationZod } from '../middleware/validation/validationZod'
import {
  categoryIdParamsSchema,
  categoryNameSchema,
} from '../middleware/validation/category.validation'

const route = Router()
const categoryController = new CategoryController(categoryService)

route.get('/', categoryController.getAllCategories)
route.get(
  '/:id',
  validationZod(categoryIdParamsSchema, 'params'),
  categoryController.getCategoryById
)
route.post(
  '/',
  validationZod(categoryNameSchema, 'body'),
  categoryController.createCategory
)
route.put(
  '/:id',
  validationZod(categoryIdParamsSchema, 'params'),
  validationZod(categoryNameSchema, 'body'),
  categoryController.updateCategory
)
route.delete(
  '/:id',
  validationZod(categoryIdParamsSchema, 'params'),
  categoryController.deleteCategory
)

export default route
