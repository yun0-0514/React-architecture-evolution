import { Product, ProductSearchCondition } from "@/types/product.type";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchProduct } from "../api/ProductApi";
import { useFetch } from "./useFetch";

export const useProduct = () => {
  const [searchParams] = useSearchParams();

  const condition: ProductSearchCondition = {
    filterType: (searchParams.get("filterType") as any) || "name",
    keyword: searchParams.get("keyword") || "",
  };
  const apiFunc = useCallback(async () => {
    return await fetchProduct(condition);
  }, [condition.filterType, condition.keyword]);

  const { data, isLoading, error } = useFetch<Product[]>(apiFunc);
  return {
    products: data || [],
    isLoading,
    error,
  };
};
