import { Product } from "../../domain/Product/Entity/Product.js";
import type { ProductGateway } from "../../domain/Product/Gateway/product.gateway.js";
import type { UseCase } from "../useCase.js";

export type CreateProductInputDTO = {
  name: string;
  price: number;
};

export type CreateProductOutputDTO = {
  id: string;
};

export class CreateProductUseCase implements UseCase<
  CreateProductInputDTO,
  CreateProductOutputDTO
> {
  private constructor(private readonly productGateway: ProductGateway) {}

  public static create(productGateway: ProductGateway) {
    return new CreateProductUseCase(productGateway);
  }

  public async execute({
    name,
    price,
  }: CreateProductInputDTO): Promise<CreateProductOutputDTO> {
    const product = Product.create(name, price);

    await this.productGateway.save(product);

    const output = this.presentOutput(product);

    return output;
  }

  private presentOutput(product: Product): CreateProductOutputDTO {
    const output: CreateProductOutputDTO = {
      id: product.id,
    };

    return output;
  }
}
