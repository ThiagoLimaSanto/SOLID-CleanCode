import type { Request, Response } from "express";
import type {
    ListProductOutputDTO,
    ListProductUseCase,
} from "../../../../../useCases/list-product/list-product.usecase.js";
import { HttpMethod, type Route } from "../route.js";

export type ListProductResponseDTO = {
  products: { id: string; name: string; price: number }[];
};

export class ListProductRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly listProductService: ListProductUseCase,
  ) {}

  public static create(listProductService: ListProductUseCase) {
    return new ListProductRoute(
      "/products",
      HttpMethod.GET,
      listProductService,
    );
  }

  getHandles(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      const output: ListProductOutputDTO =
        await this.listProductService.execute();

      const response = this.present(output);

      res.status(200).json(response).send();
    };
  }

  getPath(): string {
    return this.path;
  }
  getMethod(): HttpMethod {
    return this.method;
  }

  private present(input: ListProductOutputDTO): ListProductResponseDTO {
    const response: ListProductResponseDTO = {
      products: input.products.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
      })),
    };

    return response;
  }
}
