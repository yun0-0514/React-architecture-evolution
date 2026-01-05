import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import style from "./Product.module.scss";
import { ProductSearchCondition } from "../types/product.type";
import ProductCard from "../components/ProductCard";
import { useProduct } from "../hooks/useProduct";
import { ProductSkeleton } from "../components/ProductSkeleton";
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
        <div className="grid grid-cols-2 gap-3 p-2 w-full min-h-[50vh]">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))
          ) : products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} data={product} />
            ))
          ) : (
            <div className="col-span-2 justify-center py-20 text-gray-500">
              검색된 상품이 없습니다.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
