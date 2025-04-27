import type { Category, PrismaClient } from '@prisma/client'
import type { ICategoryService } from '../interfaces/ICategoryService'
import { NotAllowed } from '../middleware/errorHandler'

export class CategoryService implements ICategoryService {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(): Promise<Category[]> {
    return await this.prisma.category.findMany({
      include: {
        products: { select: { name: true } },
      },
    })
  }

  async findById(id: number): Promise<Category | null> {
    return await this.prisma.category.findUnique({
      where: { id },
      include: {
        products: { select: { name: true } },
      },
    })
  }

  async create(data: Pick<Category, 'name'>): Promise<Category> {
    return await this.prisma.category.create({
      data,
    })
  }

  async update(id: number, data: Category): Promise<Category | null> {
    const existingCategory = await this.prisma.category.findUnique({
      where: { id },
    })

    if (!existingCategory) {
      throw new NotAllowed(`Category with id ${id} not found`)
    }

    return await this.prisma.category.update({
      where: { id },
      data,
    })
  }

  async delete(id: number): Promise<Category | null> {
    return await this.prisma.category.delete({
      where: { id },
    })
  }
}
