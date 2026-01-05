enum ProductCategory {
  FASHION = "FASHION",
  BEAUTY = "BEAUTY",
  FOOD = "FOOD",
  ELECTRONICS = "ELECTRONICS",
  HOME_LIVING = "HOME_LIVING",
  FURNITURE_INTERIOR = "FURNITURE_INTERIOR",
  SPORTS_LEISURE = "SPORTS_LEISURE",
  OTHER = "OTHER",
}
// 1. [Meta] 검색 및 필터링 핵심 데이터 (가장 가벼움)
// 용도: 검색 엔진, 자동 완성, 카테고리 필터링
export interface ProductMeta {
  id: number; // json-server 표준은 'id' 입니다.
  name: string; // 검색 대상 1 (상품명)
  company: string; // 검색 대상 2 (제조사/브랜드)
  category: ProductCategory; // 검색 대상 3 (카테고리)
}

// 2. [Card] 목록 및 카드 UI용 데이터 (Meta 확장)
// 용도: /products 페이지, 검색 결과 리스트
// Meta 정보에 '시각적 요소(가격, 이미지)'와 '상태 배지' 정보를 추가합니다.
export interface Product extends ProductMeta {
  price: number;
  thumbnailUrl: string; // 목록용 작은 이미지
  isSoldOut: boolean; // [상태] 품절 여부 (CSS: opacity 처리)
  isNew: boolean; // [상태] 신상품 배지 (UI: "NEW" 스티커)
  reviewCount: number; // [소셜] "(105)"
  rating: number; // [소셜] "⭐ 4.5"
}

// 3. [Detail] 상세 페이지용 데이터 (Card 확장)
// 용도: /products/:id 상세 페이지
// 클릭해서 들어갔을 때만 불러오는 '무거운' 정보들입니다.
export interface ProductDetail extends Product {
  descriptionImages: string[]; // 상세페이지용 고화질 이미지 배열
  content: string; // 상품 상세 설명 (HTML 태그 포함 가능)
  stock: number; // 재고 수량 (장바구니 로직용)
  sellerInfo?: {
    // 판매자 정보 (선택 사항)
    name: string;
    contact: string;
  };
}
export interface ProductSearchCondition {
  filterType: keyof Omit<ProductMeta, "id">; //유틸함수 Omit사용 id를 제외한 속성 모두 가져와라, ProdectMeta의 확장에도 열려있음
  keyword: string;
}
