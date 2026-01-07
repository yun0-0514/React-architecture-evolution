import { ProductSearchCondition, Product } from "../types/product.type";
import { apiClient } from "./apiClient";

const BASE_API_URL = "http://localhost:4000/products";

export const fetchProduct = async (
  condition: ProductSearchCondition,
  page = 1, //페이지네이션을 위한 props
  limit = 10 //
): Promise<Product[]> => {
  const url = new URL(BASE_API_URL);

  if (condition.keyword) {
    url.searchParams.append(`${condition.filterType}_like`, condition.keyword);
  }
  //페이지네이션 쿼리를 추가하여 무한 스크롤,페이지네이션에서 한번에 불러오는 product를 제한
  url.searchParams.append("_page", page.toString());
  url.searchParams.append("_limit", limit.toString());
  const response = await apiClient<Product[]>(url.toString());
  if (response.error) {
    throw response.error;
  }
  return response.data || [];
};
