import { ProductSearchCondition } from "@/types/product.type";
import { ChangeEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

type SearchHandler = (condition: ProductSearchCondition) => void;

export const useSearchHandlers = (onSearch: SearchHandler) => {
  const [searchParams] = useSearchParams();

  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
  const [filterType, setFilterType] = useState(
    searchParams.get("filtertype") || "name"
  );
  //뒤로가기
  useEffect(() => {
    setKeyword(searchParams.get("keyword") || "");
    setFilterType(searchParams.get("filterType") || "name");
  }, [searchParams]);

  const handleKeywordCahnge = (e: ChangeEvent<HTMLInputElement>) => {
    const newKeyWord = e.target.value;
    setKeyword(newKeyWord);
    onSearch({
      filterType: filterType as any,
      keyword: newKeyWord,
    });
  };
  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newfilter = e.target.value;
    setFilterType(newfilter);
    onSearch({
      filterType: newfilter as any,
      keyword: keyword,
    });
  };
  return {
    keyword,
    filterType,
    handleFilterChange,
    handleKeywordCahnge,
  };
};
