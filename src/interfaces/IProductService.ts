import type { Product } from '@prisma/client'

export interface IProductService {
  findAll(): Promise<Product[]>
  findById(id: number): Promise<Product | null>
  create(data: Product): Promise<Product>
  update(id: number, data: Product): Promise<Product | null>
  delete(id: number): Promise<Product | null>
  findProductsByCategory(categoryId: number): Promise<Product[] | null>
}
