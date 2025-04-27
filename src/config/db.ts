import { PrismaClient } from '@prisma/client'
import { ProductService } from '../services/product.service'
import { CategoryService } from '../services/category.service'

export const prisma = new PrismaClient()

export const connectToDatabase = async () => {
  try {
    await prisma.$connect()
    console.log('Connected to the database')
  } catch (error) {
    console.error('Error connecting to the database:', error)
  }
}

// Initialize services to share the same instance of database(prisma)
export const productService = new ProductService(prisma)
export const categoryService = new CategoryService(prisma)
