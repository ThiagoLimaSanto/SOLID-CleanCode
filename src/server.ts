import "dotenv/config";
import { prisma } from "./package/prisma/prisma.js";
import { ProductRepositoryPrisma } from "./infra/repositories/product/product.repository.prisma.js";
import { CreateProductUseCase } from "./useCases/create-product/create-product.usecase.js";
import { ListProductUseCase } from "./useCases/list-product/list-product.usecase.js";
import { CreateProductRoute } from "./infra/api/express/routes/product/create-product.express.route.js";
import { ListProductRoute } from "./infra/api/express/routes/product/list-product.express.route.js";
import { ApiExpress } from "./infra/api/express/routes/api.express.js";


function main() {
  if (!process.env["PORT"]) {
    throw new Error("PORT is not set");
  }
  const Repository = ProductRepositoryPrisma.create(prisma);

  const createProductUseCase = CreateProductUseCase.create(Repository);
  const listProductUseCase = ListProductUseCase.create(Repository);

  const createRoute = CreateProductRoute.create(createProductUseCase);
  const listRoute = ListProductRoute.create(listProductUseCase);

  const api = ApiExpress.create([createRoute, listRoute]);

  api.start(3333);
}

main();
