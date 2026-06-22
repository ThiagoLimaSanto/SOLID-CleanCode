import type { Request, Response } from "express";
import type {
    CreateProductInputDTO,
    CreateProductUseCase,
} from "../../../../../useCases/create-product/create-product.usecase.js";
import { HttpMethod, type Route } from "../route.js";

export type CreateProductResponseDTO = {
  id: string;
};

export class CreateProductRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createProductService: CreateProductUseCase,
  ) {}

  public static create(createProductService: CreateProductUseCase) {
    return new CreateProductRoute(
      "/products",
      HttpMethod.POST,
      createProductService,
    );
  }

  public getHandles(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      const { name, price } = req.body;

      const input: CreateProductInputDTO = {
        name,
        price,
      };

      const output: CreateProductResponseDTO =
        await this.createProductService.execute(input);

      const response = this.present(output);

      res.status(201).json(response).send();
    };
  }

  getPath(): string {
    return this.path;
  }

  getMethod(): HttpMethod {
    return this.method;
  }

  private present(input: CreateProductResponseDTO): CreateProductResponseDTO {
    const response = { id: input.id };
    return response;
  }
}
