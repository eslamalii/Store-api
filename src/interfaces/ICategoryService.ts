import type { Category } from '@prisma/client'

export interface ICategoryService {
  findAll(): Promise<Category[]>
  findById(id: number): Promise<Category | null>
  create(data: Pick<Category, 'name'>): Promise<Category>
  update(id: number, data: Category): Promise<Category | null>
  delete(id: number): Promise<Category | null>
}
