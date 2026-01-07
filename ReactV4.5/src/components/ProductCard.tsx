import { ProductCardProps } from "@/types/components.types";
import { VscVerifiedFilled } from "react-icons/vsc";
import { IoMdStar } from "react-icons/io";

const ProductCard = ({ data }: ProductCardProps) => {
  // 가격 콤마 포맷팅
  const formattedPrice = data.price.toLocaleString();

  return (
    <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-2 w-full transition-all">
      {/* 1. 썸네일 & 배지 영역 */}
      <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-50">
        <img src={data.thumbnailUrl} alt={data.name} />
        {/* SOLD OUT 오버레이 */}
        {data.isSoldOut && (
          <div className="absolute inset-0 bg-gray-500/60 text-white text-[12px] flex items-center justify-center fon bold">
            SOLD OUT
          </div>
        )}
        {/* NEW 배지 (품절 아닐 때만 노출) */}
        {!data.isSoldOut && data.isNew && (
          <div className="absolute bottom-2 right-2 bg-green-500 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">
            NEW
          </div>
        )}
      </div>

      {/* 2. 상품 정보 영역 */}
      <div className="mt-3 flex flex-col flex-1 gap-1">
        {/* 카테고리 & 브랜드 */}
        <div className="flex flex-col gap-1 text-[10px] text-gray-400">
          <span>{data.category}</span>
          <span className="flex items-center gap-0.5">
            {data.company}
            <VscVerifiedFilled className="text-blue-500" />
          </span>
        </div>

        {/* 상품명 */}
        <h3 className="text-xs font-semibold text-gray-800 line-clamp-2 min-h-[32px]">
          {data.name}
        </h3>

        {/* 가격 & 별점 */}
        <div className="mt-auto">
          <p className="text-sm font-bold text-blue-600">{formattedPrice}원</p>
          {/* ⭐ 별점 로직 (5개 반복) */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-0.5 text-yellow-400">
              {Array.from({ length: 5 }).map((_, index) => (
                <IoMdStar
                  key={index}
                  // 나중에 CSS 시간에 색상 입힐 부분 (조건: 현재 인덱스 < 평점)
                  // 예: style={{ color: index < Math.floor(data.rating) ? "gold" : "gray" }}
                />
              ))}
            </div>
            <span>({data.reviewCount})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
