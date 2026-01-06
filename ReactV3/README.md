# 🚢 React V3 — 실무형 CRUD 아키텍처와 통신 레이어 분리

> **V3의 핵심 목표는 “프론트엔드가 서버와 통신할 때 가져야 할 책임의 경계를 명확히 하는 것”입니다.**
> V2에서 Context와 Reducer로 클라이언트 상태 흐름을 정리했다면,
> V3에서는 **데이터 영속성의 주체를 서버로 이전**하고 실무에 가까운 통신 구조를 구축했습니다.

---

## 🎯 V3에서 해결하고자 한 문제

V2까지의 구조는 클라이언트 내부 상태 흐름을 이해하는 데는 적합했지만,
실제 서비스 관점에서는 다음과 같은 한계를 가지고 있었습니다.

- 데이터 영속성이 브라우저(LocalStorage)에 의존
- 컴포넌트가 서버 통신 방식(fetch)에 대해 직접 인지
- 비동기 통신 로직과 UI 로직의 결합 가능성

👉 **V3는 “서버와 통신하는 프론트엔드의 최소 책임”을 명확히 정의하는 단계입니다.**

---

## 🛠️ 주요 리팩토링 포인트

### 1️⃣ RESTful API 레이어 구축 (json-server)

실제 서버 환경과 동일한 엔드포인트 구조를 제공하기 위해 `json-server`를 도입했습니다.

- JSON 파일 기반의 RESTful API 구성
- CRUD 요청을 전담하는 API 모듈 분리
- 엔드포인트 상수화(`BASE_API_URL`)를 통한 변경 비용 최소화

```javascript
// src/api/membersApi.js
export const updateMember = async (id, updateData) => {
  const response = await fetch(`${BASE_API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateData),
  });
  if (!response.ok) throw new Error("Member 업데이트 실패");
  return response.json();
};
```

> 💡 **상위 계층(UI / Hook)은 내부 구현(fetch/axios)을 알지 못하고,
> 동일한 인터페이스로 데이터를 요청할 수 있도록 설계했습니다.**

---

### 2️⃣ useFetch — ‘통제실’에서 ‘비서’로 역할 재정의

V2의 `useFetch`는 데이터 정합성까지 책임지는 과도한 역할을 수행하고 있었습니다.
V3에서는 훅의 책임을 명확히 분리하여 **비동기 상태 관리에만 집중하도록 구조를 개선했습니다.**

- **V2**: 데이터 소스 결정 + 비동기 시뮬레이션 + 상태 관리
- **V3**: 주입받은 `apiFunc` 실행 및 Loading / Success / Error 상태 관리

> 💡 훅은 “무엇을 가져오는지”가 아니라
> **“비동기 작업이 어떤 상태에 있는지”만 알고 있어야 한다는 기준을 세웠습니다.**

---

### 3️⃣ React Hook Form 기반 선언적 CRUD

복잡한 폼 상태 관리 비용을 줄이기 위해 React Hook Form을 도입했습니다.

- `register`: 반복되는 ref 및 이벤트 바인딩 자동화
- `handleSubmit`: 유효성 검사 선행 및 `preventDefault` 자동 처리
- `reset`: 서버 응답 기반 폼 상태 초기화

```javascript
const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm();

const onSubmit = async (data) => {
  try {
    const result = data.id
      ? await updateMember(data.id, data)
      : await createMember(data);

    data.id ? onUpdate(result) : onCreate(result);
    reset();
  } catch (err) {
    alert(`처리 실패: ${err.message}`);
  }
};
```

> 💡 폼 로직을 명령형으로 제어하지 않고,
> **개발자가 비즈니스 로직(onSubmit)에만 집중할 수 있도록 설계했습니다.**

---

## 🧠 V3 설계에서 얻은 인사이트

- 프론트엔드에서도 **통신 레이어와 UI 레이어는 반드시 분리되어야 한다**
- 커스텀 훅은 “기능 추가”보다 **역할 정의가 더 중요하다**
- 라이브러리는 문제를 해결해 주지만,

---

## 🗺️ 다음 단계 (Roadmap)

V3를 통해 데이터 영속성의 책임이 서버로 이동했습니다.
이제 더 많은 데이터와 사용자 경험을 다루기 위한 단계로 확장합니다.

## 🔗 관련 기록

- [[React.js] ReactV3 리팩토링: json-server 도입과 실무형 CRUD 아키텍처 완성](https://velog.io/@yun0-0514/React.js-ReactV3-%EB%A6%AC%ED%8C%A9%ED%86%A0%EB%A7%81-json-server-%EB%8F%84%EC%9E%85%EA%B3%BC-%EC%8B%A4%EB%AC%B4%ED%98%95-CRUD-%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98-%EC%99%84%EC%84%B1)

---

### 🔚 정리

> **V3는 “서버와 통신하는 프론트엔드의 기본 구조를 직접 만들어본 단계”입니다.**
> 이후 버전에서는 이 구조를 기반으로 전문 라이브러리를 도입하며
> _“직접 구현 → 위임”의 흐름을 완성합니다._
