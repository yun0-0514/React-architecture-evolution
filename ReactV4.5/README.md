# 👨🏻‍💻 React V4.5 — 무한 스크롤 & 스마트 검색 패턴

> **"리스트 화면의 상태는 URL과 훅에서 관리, UI는 단순 렌더링"**
> V4 기반에서 **무한 스크롤, 스마트 검색, 디바운싱, React Query**를 결합해 실제 서비스 수준의 리스트 UX를 구현했습니다.

---

## 🎯 목표 & 기술적 의도

| 목표                       | 기술/패턴                              | UX & 시스템 효과                                                        |
| -------------------------- | -------------------------------------- | ----------------------------------------------------------------------- |
| 🚀 **UX 중심 무한 스크롤** | Intersection Observer + Infinite Query | 버튼 없는 탐색, 자동 로딩 → **체류 시간 증가, 끊김 없는 경험**          |
| 🔍 **검색 경험 최적화**    | 디바운싱 + URL Query + Custom Hook     | 빠른 입력 시 API 호출 방지 → **서버 부하 감소**, 뒤로가기 시 상태 유지  |
| 🔄 **재사용 가능한 패턴**  | Custom Hooks 캡슐화                    | 로직(Hook)과 뷰(UI) 분리 → **게시판, 피드 등 타 도메인 즉시 적용 가능** |
| ⚙️ **데이터 일관성**       | React Query (Server State)             | 캐싱 및 가비지 컬렉션 정책 → **데이터 최신화 및 중복 요청 방지**        |

---

## 🛠 핵심 기술 & 사용 이유

| 기술                      | 역할/설명                   | 왜 사용했는가 / 효과                                        |
| ------------------------- | --------------------------- | ----------------------------------------------------------- |
| **React Query**           | 서버 상태 관리, 캐싱        | 반복 API 요청 최소화 → 서버 과부하 방지, 데이터 일관성 유지 |
| **Infinite Query**        | 페이지 단위 무한 스크롤     | 부드러운 무한 스크롤 UX, 자동 다음 페이지 로딩              |
| **Intersection Observer** | 리스트 하단 감지 (Sentinel) | DOM 관찰 기반 효율적 트리거 → 불필요 렌더링 방지            |
| **useDebounce**           | 검색어 디바운싱             | 빠른 타이핑 시 API 호출 최소화 → UX 향상 및 리소스 절약     |
| **useSearchHandlers**     | 검색 상태/이벤트 분리       | 검색 로직 캡슐화, URL Query 동기화 → 뒤로가기/공유 지원     |
| **JSON Server**           | Mock API 서버               | 실제 API 없이도 리스트/검색 패턴 테스트 가능                |
| **Skeleton UI**           | 로딩 중 레이아웃 유지       | 화면 깜빡임(CLS) 최소화 → 체감 속도 개선                    |

---

## 🔄 데이터 흐름 (Architecture Flow)

<div align="center">
<img src="./public/스마트 검색 엔진.png" width="80%" alt="스마트 검색엔진 데이터 흐름도">
</div>

1.  **User Action**: 검색어 입력 (Debounce 500ms) or 스크롤 하단 도달
2.  **State Update**: URL Query Parameter 업데이트 & React Query Key 변경
3.  **Data Fetching**: `useProductInfinity` 훅 트리거 → API 요청
4.  **UI Update**: 데이터 수신 → 리스트 렌더링 (로딩 시 Skeleton UI)

---

## 🔧 주요 훅 & 패턴 (Core Logic)

### 1️⃣ useProductInfinity (Data Layer)

- `useInfiniteQuery`를 래핑하여 **데이터 패칭 로직을 UI에서 분리**
- `staleTime(1분)` / `gcTime(5분)` 정책으로 불필요한 네트워크 요청 차단
- `data.pages`를 `flatMap`으로 평탄화하여 컴포넌트가 사용하기 쉬운 형태로 반환

### 2️⃣ useIntersectionObserver (Trigger Layer)

- `IntersectionObserver API`를 활용한 **고성능 스크롤 감지**
- `enabled` 플래그를 통해 로딩 중이거나 데이터가 없을 때 관찰을 중지하여 **메모리 누수 방지**
- 반환된 `ref`를 Sentinel 컴포넌트에 연결하는 선언적 구조

### 3️⃣ useSearchHandlers (Logic Layer)

- 검색어(`keyword`)와 필터(`filterType`) 상태를 관리하며 **URL과 양방향 동기화**
- 컴포넌트는 복잡한 로직 없이 `handleKeywordChange` 같은 핸들러만 사용

---

## 🚨 트러블슈팅 (Trouble Shooting)

### [Issue 01] 검색어 유무에 따른 페이징 파라미터 누락

- **현상**: 검색어 입력 시에는 무한 스크롤 정상 작동, 검색어 없이 전체 목록 조회 시 무한 스크롤 미작동
- **원인**: API 요청 로직이 `if (keyword)` 블록 안에 갇혀 있어, 검색어가 없으면 `_page`와 `_limit` 파라미터가 누락됨
- **해결**: 페이징 파라미터를 검색 조건과 무관한 공통 필수 규격으로 분리하여 조건문 밖에서 관리하도록 수정

### [Issue 02] 라이브러리 간 에러 처리 불일치 (Adapter Pattern)

- **현상**: 서버 에러(500) 발생 시 React Query의 `isError` 상태가 활성화되지 않음
- **원인**: `apiClient`는 에러 발생 시 객체를 반환하지만, React Query는 `Promise`가 `reject`(throw) 되어야 에러로 인식
- **해결**: `fetchProduct` 함수를 **어댑터(Adapter)**로 활용. 응답 객체의 `ok` 상태를 체크하여 에러 발생 시 강제로 `Error`를 throw → 라이브러리 표준에 맞게 보정

---

## ✨ Key Takeaways (핵심 성과)

- **재사용성(Reusability)**: "Intersection Observer + Infinite Query + Debounce" 조합을 모듈화하여, 상품 리스트뿐만 아니라 댓글, 로그 뷰어 등 **어떤 리스트 화면에도 즉시 적용 가능한 패턴**을 정립했습니다.
- **사용자 경험(UX)**: 스켈레톤 UI와 디바운싱을 통해 **체감 속도를 높이고**, URL 동기화를 통해 **공유와 탐색 경험**을 개선했습니다.
- **성능 최적화(Performance)**: 불필요한 렌더링과 API 호출을 차단하여 클라이언트와 서버 양쪽의 부하를 줄였습니다.

---

## 🔗 Export

- 📝 [Velog: ReactV4.5 스마트 리스트 패턴](https://velog.io/@yun0-0514/ReactTs-React-Query%EC%99%80-Debounce%EC%9D%98-%EB%8F%84%EC%9E%85%EC%9D%84-%ED%86%B5%ED%95%9C-%EC%8A%A4%EB%A7%88%ED%8A%B8%ED%95%9C-%EA%B2%80%EC%83%89-%EC%B5%9C%EC%A0%81%ED%99%94ReactV4.5)
- 📧 Email: [ypy2141@naver.com](mailto:ypy2141@naver.com)
