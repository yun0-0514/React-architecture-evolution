# 🚢 React V3TS — 명시적 타입 설계도를 장착한 프로젝트 마이그레이션과 리팩토링

본 마이그레이션의 핵심은
**TypeScript 도입 자체가 아니라, 타입을 통해 시스템의 경계를 다시 설계한 데 있습니다.**

도메인과 계층 간 데이터 계약을 명시적으로 정의하고,
정적 타입 검사를 통해 **구조적 오류를 실행 이전에 차단**하는 것을 목표로 했습니다.

기존 구조는 동작은 했지만,
**데이터가 어떤 형태로, 어떤 책임을 지며 흘러야 하는지에 대한 설계도는 코드에 남아있지 않았습니다.**

V3TS 마이그레이션과 리팩토링은 이를
**관례에 의존한 구조에서, 타입으로 경계를 드러내는 구조로 전환하는 작업**입니다.

---

## 🎯 목표 요약

1. 도메인과 계층 간 데이터 타입을 명시적으로 정의하여
   **정적 검사 단계에서 구조적 오류를 차단**
2. API 응답 규격의 차이를 흡수하는 **비동기 Adapter Layer 도입**
3. 같은 도메인이더라도 **사용 맥락에 따라 다른 ‘무게’를 갖는 타입 설계**
4. 방어적이고 확장에 유리한 비동기 데이터 흐름 구축

---

## 1️⃣ 도메인 & 계층 간 타입 계약 명시

TypeScript 도입 이전에는
API → Hook → Context → UI로 이어지는 데이터 흐름이
개발자의 암묵적인 합의에 의존하고 있었습니다.

이로 인해 도메인 확장 시:

- 기존 코드 전수 조사 필요
- 런타임에서야 타입 불일치가 드러나는 구조

V3TS에서는 이를 해결하기 위해
**도메인 타입을 계층 간 공통 계약(Contract)**으로 사용합니다.

```ts
export interface AsyncState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}
```

모든 UI 계층은
**오직 이 타입만을 기준으로 비동기 상태를 소비**합니다.

---

## 2️⃣ apiClient — 비동기 응답 Adapter Layer 도입

API 응답은 서비스마다, 상황마다 서로 다른 형태를 가질 수 있습니다.
이 응답을 그대로 상태 관리 계층에 전달하면
비동기 상태의 일관성이 쉽게 무너집니다.

이를 해결하기 위해
**API 응답과 내부 비동기 상태 사이에 Adapter Layer(apiClient)**를 도입했습니다.

```ts
export interface SupabaseResponse<T> {
  data: T | null;
  error: Error | null;
  status: number;
}
```

```ts
export const apiClient = async <T>(
  url: string,
): Promise<SupabaseResponse<T>> => {
  try {
    const res = await fetch(url);
    const data = res.ok ? await res.json() : null;

    return {
      data,
      error: res.ok ? null : new Error("HTTP Error"),
      status: res.status,
    };
  } catch (e) {
    return { data: null, error: e as Error, status: 500 };
  }
};
```

이 구조를 통해:

- API 응답의 다양성은 **apiClient에서만 처리**
- 비동기 상태는 항상 **예측 가능한 형태로 유지**
- 네트워크 오류 / HTTP 오류를 동일한 규격으로 방어

---

## 3️⃣ 비동기 상태와 UI 사이의 방어적 분리

`useFetch`는
apiClient의 응답을 **AsyncState<T>로 변환하는 역할**만 담당합니다.

- UI는 API 구현을 알 필요가 없음
- 비동기 상태의 형태가 프로젝트 전반에서 통일
- 새로운 API 추가 시 기존 UI / Context 수정 불필요

```ts
const fetchProducts = () => apiClient<Product[]>("/products");

const { data, isLoading, error } = useFetch<Product[]>(fetchProducts);
```

---

## 4️⃣ 도메인 타입의 계층화 — 같은 도메인, 다른 무게

V3TS에서는
**같은 도메인이라도 사용 맥락에 따라 타입의 무게를 분리**했습니다.

```ts
export interface ProductMeta { ... }      // 최소 식별 정보
export interface Product extends ProductMeta { ... } // 목록 / 카드
export interface ProductDetail extends Product { ... } // 상세
```

이를 통해:

- 불필요한 데이터 의존 제거
- UI 목적에 맞는 데이터만 사용
- 도메인 확장 시 기존 구조에 영향 최소화

---

## ✅ 마이그레이션과 리팩토링 결과 요약

- 타입이 문서가 아닌 **실제 설계도 역할 수행**
- 비동기 흐름의 방어력과 확장성 확보
- 도메인 확장이 “두려운 작업”이 아닌 **예측 가능한 작업**으로 전환

> **이 React V3TS는
> “TypeScript를 사용했다”가 아니라,
> “타입을 통해 시스템의 경계를 설계했다”는 데에 의미가 있습니다.**

---

## Export

🔗[React V3TS Velog 리포트](https://velog.io/@yun0-0514/React.jsJS-to-TS-%EB%A6%AC%ED%8C%A9%ED%86%A0%EB%A7%81%EA%B3%B5%ED%8F%AC%EC%9D%98-%EB%B9%A8%EA%B0%84%EC%A4%84-ReactV3TS)
✉️Email:[ypy2141@naver.com](mailto:ypy2141@naver.com)
