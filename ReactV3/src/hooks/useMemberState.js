import { useContext } from "react";
import { MemberStateContext } from "../contexts/MemberContext";

export const useMemberInfo = () => {
  const context = useContext(MemberStateContext);

  if (context === null || context === undefined) {
    throw new Error(
      "context 할당에 실패하였습니다, 구조 확인 후 코드를 수정하세요,Provider의 유효 범위 바깥에서 호출됨"
    );
  }
  if (context.error) {
    window.alert("데이터 로딩 실패..");
  }
  const { data, isLoading, error } = context;
  if (!isLoading && !Array.isArray(data)) {
    console.error("데이터가 배열이 아닙니다:", data);
  }
  return { data, isLoading, error };
};
