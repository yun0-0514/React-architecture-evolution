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
    // 추가 변경점 :fetchProduct에 page 인자가 없으므로 기본값(Page 1, Limit 10)만 가져옵니다.
    // 만약 일반 페이지네이션을 구현하려면 searchParams.get('page')를 넘겨야 합니다
    queryFn: () => fetchProduct(condition),
    staleTime: 1000 * 60,
    gcTime: 100 * 60 * 5,
    placeholderData: keepPreviousData,
  });

  return {
    products: data || [],
    isLoading,
    error,
    isPlaceholderData,
  };
};
