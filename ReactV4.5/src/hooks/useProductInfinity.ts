import { ProductSearchCondition } from "@/types/product.type";
import { useSearchParams } from "react-router-dom";
import { fetchProduct } from "../api/ProductApi";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useDebounce } from "./useDebounce";

//Limit 정의
const PAGING_LIMIT = 10;

export const useProductInfinity = () => {
  const [searchParams] = useSearchParams();

  const filterType = (searchParams.get("filterType") as any) || "name";
  const rawKeyword = searchParams.get("keyword") || "";
  const debounceKeyword = useDebounce(rawKeyword, 500);

  const condition: ProductSearchCondition = {
    filterType,
    keyword: debounceKeyword,
  };

  const {
    data,
    isLoading,
    error,
    fetchNextPage, // Observer와 연결할 '다음 페이지 호출' 트리거
    hasNextPage, // 다음 데이터 존재 여부 (Observer 활성화 기준)
    isFetchingNextPage, // 추가 데이터 로딩 상태 (스피너 표시용)
  } = useInfiniteQuery({
    queryKey: ["products", condition],

    // API에 우리가 정한 LIMIT을 명시적으로 전달해야 함
    queryFn: ({ pageParam = 1 }) =>
      fetchProduct(condition, pageParam, PAGING_LIMIT),

    initialPageParam: 1,

    getNextPageParam: (lastPage, allPages) => {
      // PAGING_LIMIT(10)보다 적게 왔으면 '끝'으로 판단
      // (!lastPage 체크는 빈 배열이 올 수도 있으므로 필수)
      if (!lastPage || lastPage.length < PAGING_LIMIT) {
        return undefined; // 다음 페이지 없음 (hasNextPage = false됨)
      }
      // 현재 페이지 개수 + 1 = 다음 페이지 번호
      return allPages.length + 1;
    },
    staleTime: 100 * 60 * 1, // 1분 동안은 데이터를 '신선'하다고 간주 (API 재요청 안 함)
    gcTime: 1000 * 60 * 5, // 5분 뒤에는 메모리에서 완전히 삭제 (Garbage Collection)
  });

  // 데이터 평탄화 (Optional Chaining과 OR 연산자 순서 주의)
  // data가 undefined일 때 빈 배열 반환하여 UI 에러 방지
  const products = data?.pages.flatMap((page) => page) || [];

  return {
    products,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
