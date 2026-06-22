import express, { type Express } from "express";
import type { Api } from "../../api.js";
import type { Route } from "./route.js";

export class ApiExpress implements Api {
  private app: Express;

  private constructor(routes: Route[]) {
    this.app = express();
    this.app.use(express.json());
    this.addRoutes(routes);
  }

  public start(port: number) {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      this.listRoutes();
    });
  }

  public static create(routes: Route[]) {
    return new ApiExpress(routes);
  }

  private addRoutes(routes: Route[]) {
    routes.forEach((r) => {
      const path = r.getPath();
      const method = r.getMethod();
      const handler = r.getHandles();

      this.app[method](path, handler);
    });
  }

  private listRoutes() {
    const routes = this.app.router?.stack
      .filter((r: any) => r.route)
      .map((r: any) => {
        return {
          path: r.route.path,
          method: r.route.stack[0].method,
        };
      });

    console.log(routes);
  }
}
