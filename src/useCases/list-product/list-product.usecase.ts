import type { Product } from "../../domain/Product/Entity/Product.js";
import type { ProductGateway } from "../../domain/Product/Gateway/product.gateway.js";
import type { UseCase } from "../useCase.js";

export type ListProductInputDTO = void;

export type ListProductOutputDTO = {
  products: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
};

export class ListProductUseCase implements UseCase<
  ListProductInputDTO,
  ListProductOutputDTO
> {
  private constructor(private readonly productGateway: ProductGateway) {}

  public static create(productGateway: ProductGateway) {
    return new ListProductUseCase(productGateway);
  }

  public async execute(): Promise<ListProductOutputDTO> {
    const products = await this.productGateway.list();

    const output = this.presentOutput(products);

    return output;
  }

  private presentOutput(products: Product[]): ListProductOutputDTO {
    const output: ListProductOutputDTO = {
      products: products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
      })),
    };

    return output;
  }
}
