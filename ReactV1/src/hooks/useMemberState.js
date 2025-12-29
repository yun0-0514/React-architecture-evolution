import { useContext } from "react";
import { MemberContext } from "../contexts/MemberContext";

export const useMemberState = () => {
  const contexts = useContext(MemberContext);
  if (contexts === null || contexts === undefined) {
    throw new Error(
      "context 할당에 실패하였습니다, 구조 확인 후 코드를 수정하세요,Provider의 유효 범위 바깥에서 호출됨"
    );
  }
  if (contexts.error) {
    window.alert("데이터 로딩 실패..");
  }
  console.log("useMemberState");
  return {
    data: contexts.data,
    isLoading: contexts.isLoading,
  };
};
