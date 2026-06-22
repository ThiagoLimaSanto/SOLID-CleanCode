import type { Product } from "../Entity/Product.js";

export interface ProductGateway {
  save(product: Product): Promise<void>;
  list(): Promise<Product[]>;
}
