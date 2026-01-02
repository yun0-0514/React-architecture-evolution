import { ProductCardProps } from "@/types/components.types";
import { VscVerifiedFilled } from "react-icons/vsc";
import { IoMdStar } from "react-icons/io";

const ProductCard = ({ data }: ProductCardProps) => {
  // 가격 콤마 포맷팅
  const formattedPrice = data.price.toLocaleString();

  return (
    <div>
      {/* 1. 썸네일 & 배지 영역 */}
      <div>
        <img src={data.thumbnailUrl} alt={data.name} />

        {/* SOLD OUT 오버레이 */}
        {data.isSoldOut && <div>SOLD OUT</div>}

        {/* NEW 배지 (품절 아닐 때만 노출) */}
        {!data.isSoldOut && data.isNew && <div>NEW</div>}
      </div>

      {/* 2. 상품 정보 영역 */}
      <div>
        {/* 카테고리 & 브랜드 */}
        <div>
          <span>{data.category}</span>
          <span>
            {data.company}
            <VscVerifiedFilled />
          </span>
        </div>

        {/* 상품명 */}
        <h3>{data.name}</h3>

        {/* 가격 & 별점 */}
        <div>
          <p>{formattedPrice}원</p>

          {/* ⭐ 별점 로직 (5개 반복) */}
          <div>
            {Array.from({ length: 5 }).map((_, index) => (
              <IoMdStar
                key={index}
                // 나중에 CSS 시간에 색상 입힐 부분 (조건: 현재 인덱스 < 평점)
                // 예: style={{ color: index < Math.floor(data.rating) ? "gold" : "gray" }}
              />
            ))}
            <span>({data.reviewCount})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
