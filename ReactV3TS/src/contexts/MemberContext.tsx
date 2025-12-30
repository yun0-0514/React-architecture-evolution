import {
  createContext,
  useMemo,
  useReducer,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { useFetch } from "../hooks/useFetch";
import { fetchMember } from "../api/MembersApi";
import {
  Member,
  MemberStateContextType,
  MemberAction,
  MemberState,
  MemberProviderProps,
  MemberDispatchContextType,
} from "@/types/member.types";

export const MemberStateContext = createContext<MemberStateContextType | null>(
  null
);

export const MemberDispatchContext =
  createContext<MemberDispatchContextType | null>(null);

const initialState: MemberState = {
  members: [],
  initialized: false,
};
const memberReducer = (state: MemberState, action: MemberAction) => {
  switch (action.type) {
    case "INIT":
      return {
        members: action.members,
        initialized: true,
      }; //초기화기 떄문에 아에 기존과 합칠 필요 없음
    case "CREATE":
      return {
        ...state,
        members: [...state.members, action.member],
      };
    case "UPDATE":
      return {
        ...state,
        members: state.members.map((item) =>
          item.id === action.member.id ? action.member : item
        ),
      };
    case "DELETE":
      return {
        ...state,
        members: state.members.filter((item) => item.id !== action.id),
      };
    default:
      return state;
  }
};

export const useMemberManagement = () => {
  const [state, dispatch] = useReducer(memberReducer, initialState);

  const onInit = useCallback((data: Member[]) => {
    dispatch({
      type: "INIT",
      members: data,
    });
  }, []);
  const onCreate = useCallback((data: Member) => {
    dispatch({
      type: "CREATE",
      member: data,
    });
  }, []);
  const onUpdate = useCallback((data: Member) => {
    dispatch({
      type: "UPDATE",
      member: data,
    });
  }, []);
  const onDelete = useCallback((id: string | number) => {
    dispatch({
      type: "DELETE",
      id: id,
    });
  }, []);
  return {
    members: state.members,
    initialized: state.initialized,
    onInit,
    onCreate,
    onUpdate,
    onDelete,
  };
};
export const MemberProvider = ({ children }: MemberProviderProps) => {
  const { data: fetchedData, isLoading, error } = useFetch(fetchMember);
  const { members, initialized, onCreate, onUpdate, onDelete, onInit } =
    useMemberManagement();

  //초기 데이터 설정
  useEffect(() => {
    console.log("시작");
    if (isLoading || initialized || !fetchedData) return;
    onInit(fetchedData);
    console.log("서버 데이터 동기화 완료");
  }, [isLoading, fetchedData, initialized, onInit]);

  const contextValue = useMemo(
    () => ({ members, isLoading, error }),
    [members, isLoading, error]
  );

  const contextStateValue = useMemo(
    () => ({
      onCreate,
      onDelete,
      onInit,
      onUpdate,
    }),
    [onCreate, onDelete, onInit, onUpdate]
  );

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
    throw new Error(
      "useMemberState는 MemberProvider 내부에서만 사용할 수 있습니다."
    );
  }
  return context;
};

export const useMemberDispatch = () => {
  const context = useContext(MemberDispatchContext);
  if (!context) {
    throw new Error(
      "useMemberDispatch는 MemberProvider 내부에서만 사용할 수 있습니다."
    );
  }
  return context;
};
