import { ProductSearchCondition } from "@/types/product.type";
import { useSearchParams } from "react-router-dom";
import { fetchProduct } from "../api/ProductApi";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from "./useDebounce";

export const useProduct = () => {
  const [searchParams] = useSearchParams();

  const filterType = (searchParams.get("filterType") as any) || "name";
  const rawKeyword = searchParams.get("keyword") || "";
  const debounceKeyword = useDebounce(rawKeyword, 500);

  const condition: ProductSearchCondition = {
    filterType,
    keyword: debounceKeyword,
  };

  const { data, isLoading, error, isPlaceholderData } = useQuery({
    queryKey: ["products", condition],
    queryFn: () => fetchProduct(condition),
    staleTime: 1000 * 60,
    placeholderData: keepPreviousData,
  });

  return {
    products: data || [],
    isLoading,
    error,
    isPlaceholderData,
  };
};
