import type { PrismaClient } from "@prisma/client/extension";
import { Product } from "../../../domain/Product/Entity/Product.js";
import type { ProductGateway } from "../../../domain/Product/Gateway/product.gateway.js";

export class ProductRepositoryPrisma implements ProductGateway {
  private constructor(private readonly prismaClient: PrismaClient) {}

  public static create(prismaClient: PrismaClient): ProductGateway {
    return new ProductRepositoryPrisma(prismaClient);
  }

  public async save(product: Product): Promise<void> {
    const data = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    };

    await this.prismaClient.product.create({
      data,
    });
  }

  public async list(): Promise<Product[]> {
    const products = await this.prismaClient.product.findMany();

    return products.map((p: Product) => {
      return Product.with({
        id: p.id,
        name: p.name,
        price: p.price,
        quantity: p.quantity,
      });
    });
  }
}
