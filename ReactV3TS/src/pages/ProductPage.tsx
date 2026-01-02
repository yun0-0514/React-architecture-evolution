import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import style from "./Product.module.scss";
import { ProductSearchCondition, Product } from "../types/product.type";
import ProductCard from "../components/ProductCard";
import { useProduct } from "../hooks/useProduct";
const ProductPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, isLoading } = useProduct();

  const searchHandle = (condition: ProductSearchCondition) => {
    if (!condition.keyword) {
      setSearchParams({});
    }
    setSearchParams({
      filterType: condition.filterType,
      keyword: condition.keyword,
    });
  };

  return (
    <div className={style.pageContainer}>
      {/* 상단: 타이틀 영역 (필요시 사용) */}
      <section className={style.section}>
        <h2 className="text-2xl font-black text-gray-800 self-start mb-2">
          상품 관리 시스템
        </h2>
      </section>

      {/* 중단: 검색바 영역 */}
      <section className={style.section}>
        <SearchBar onSearch={searchHandle} />
      </section>

      {/* 하단: 리스트 영역 */}
      <section className={style.section}>
        <div className={style.listHeader}>상품 리스트</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {isLoading ? (
            <div className="col-span-full text-center py-10 text-gray-500">
              로딩 중입니다... ⏳
            </div>
          ) : products.length > 0 ? (
            products.map((product) => <ProductCard data={product} />)
          ) : (
            <div>검색된 상품이 없습니다.</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
