import type { PrismaClient, Product } from '@prisma/client'
import type { IProductService } from '../interfaces/IProductService'
import { NotFoundError } from '../middleware/errorHandler'

export class ProductService implements IProductService {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(): Promise<Product[]> {
    return await this.prisma.product.findMany({
      include: {
        category: { select: { name: true } },
      },
    })
  }

  async findById(id: number): Promise<Product | null> {
    return await this.prisma.product.findUnique({
      where: { id },
      include: {
        category: { select: { name: true } },
      },
    })
  }

  async create(data: any): Promise<Product> {
    const existingCategory = await this.prisma.category.findUnique({
      where: { id: data.categoryId },
    })

    if (!existingCategory) {
      throw new NotFoundError('Category Not Found')
    }

    return await this.prisma.product.create({
      data,
    })
  }

  async update(id: number, data: Partial<Product>): Promise<Product | null> {
    const existingProduct = await this.prisma.product.findUnique({
      where: { id },
    })

    if (!existingProduct) {
      throw new NotFoundError('Product Not Found')
    }

    return await this.prisma.product.update({
      where: { id },
      data,
    })
  }

  async delete(id: number): Promise<Product | null> {
    const existingProduct = await this.prisma.product.findUnique({
      where: { id },
    })

    if (!existingProduct) {
      throw new NotFoundError('Product Not Found')
    }

    return await this.prisma.product.delete({
      where: { id },
    })
  }

  async findProductsByCategory(categoryId: number): Promise<Product[] | null> {
    return await this.prisma.product.findMany({
      where: { categoryId },
      include: {
        category: { select: { name: true } },
      },
    })
  }
}
