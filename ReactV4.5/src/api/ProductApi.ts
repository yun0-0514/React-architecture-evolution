import { ProductSearchCondition, Product } from "../types/product.type";
import { apiClient } from "./apiClient";

const BASE_API_URL = "http://localhost:4000/products";

export const fetchProduct = async (
  condition: ProductSearchCondition
): Promise<Product[]> => {
  const url = new URL(BASE_API_URL);

  if (condition.keyword) {
    url.searchParams.append(`${condition.filterType}_like`, condition.keyword);
  }
  const response = await apiClient<Product[]>(url.toString());
  if (response.error) {
    throw response.error;
  }
  return response.data || [];
};
