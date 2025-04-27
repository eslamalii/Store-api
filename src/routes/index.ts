import { Router } from 'express'
import productRoutes from './product.routes'
import categoryRoutes from './category.routes'

const route = Router()

route.use('/products', productRoutes)
route.use('/categories', categoryRoutes)

export default route
