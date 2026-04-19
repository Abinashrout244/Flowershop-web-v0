import { products } from "../data/flowers";

export const productService = {
  async list() {
    return products;
  },
};
