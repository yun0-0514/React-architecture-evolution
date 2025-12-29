import { createContext, useMemo, useReducer, useEffect, useCallback, useContext } from "react";
import { useFetch } from "../hooks/useFetch";
// import { useMemberState } from "../hooks/useMemberState";
// import useFetchMembers from "../hooks/useFetchMembers";
// import { useFetch } from "../hooks/useFetch";

export const MemberStateContext = createContext(null);
export const MemberDispatchContext = createContext(null);

const initialState = {
  members: [],
  initialized: false,
};
const memberReducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return {
        members: action.data,
        initialized: true,
      }//초기화기 떄문에 아에 기존과 합칠 필요 없음
    case "CREATE":
      return {
        ...state,
        members: [...state.members, action.data]
      }
    case "UPDATE":
      return {
        ...state,
        members: state.members.map((item) => (item.id === action.data.id ? action.data : item)),
      }
    case "DELETE":
      return {
        ...state,
        members: state.members.filter((item) => item.id !== action.id),
      }
    default: return state;
  }
}

export const useMemberManagement = () => {
  const [state, dispatch] = useReducer(memberReducer, initialState);

  const onInit = useCallback((data) => {
    dispatch({
      type: "INIT",
      data: data
    })
  }, []);
  const onCreate = useCallback((data) => {
    dispatch({
      type: "CREATE",
      data: data,
    })
  }, []);
  const onUpdate = useCallback((data) => {
    dispatch({
      type: "UPDATE",
      data: data
    })
  }, []);
  const onDelete = useCallback((id) => {
    dispatch({
      type: "DELETE",
      id: id
    })
  }, []);
  return { members: state.members, initialized: state.initialized, onInit, onCreate, onUpdate, onDelete }
}
export const MemberProvider = ({ children }) => {

  const { data: fetchedData, isLoading, error } = useFetch(null);
  const { members, initialized, onCreate, onUpdate, onDelete, onInit } = useMemberManagement();

  //초기 데이터 설정
  useEffect(() => {
    if (isLoading) return;
    if (initialized) return;
    if (!fetchedData) return;

    onInit(fetchedData);
  }, [isLoading, fetchedData, initialized, onInit]);

  //로컬 스토리지 업데이트 Effect
  useEffect(() => {
    if (!initialized) return;

    localStorage.setItem(
      "member",
      JSON.stringify(members)
    );
  }, [members, initialized]);


  const contextValue = useMemo(() => ({ data: members, isLoading, error }), [members, isLoading, error]);

  const contextStateValue = useMemo(() => ({
    onCreate, onDelete, onInit, onUpdate
  }), [onCreate, onDelete, onInit, onUpdate]);
  return (

    <MemberDispatchContext.Provider value={contextStateValue}>
      <MemberStateContext.Provider value={contextValue}>
        {children}
      </MemberStateContext.Provider>
    </MemberDispatchContext.Provider>
  );
};

export const useMemberState = () => {
  const context = useContext(MemberStateContext);
  if (!context) {
    throw new Error("useMemberState는 MemberProvider 내부에서만 사용할 수 있습니다.");
  }
  return context;
};

export const useMemberDispatch = () => {
  const context = useContext(MemberDispatchContext);
  if (!context) {
    throw new Error("useMemberDispatch는 MemberProvider 내부에서만 사용할 수 있습니다.");
  }
  return context;
};

