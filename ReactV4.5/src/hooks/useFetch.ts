/**
 * @deprecated
 * 현재 Member 도메인에서만 사용 중입니다.
 * V5 이후 React Query로 마이그레이션 완료되면 삭제될 예정입니다.
 * 새로운 기능에는 useQuery를 사용하세요.
 */

import { AsyncState, SuperbaseResponse } from "../types/function.types";
import { useCallback, useEffect, useState } from "react";

export const useFetch = <T>(apiFunc?: () => Promise<SuperbaseResponse<T>>) => {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    isLoading: true,
    error: null,
  });

  const loadData = useCallback(async () => {
    if (typeof apiFunc !== "function") {
      setState({
        data: null,
        isLoading: false,
        error: new Error("API function is missing"),
      });
      return;
    }
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const result = await apiFunc();
      if (result.error) {
        setState({ data: null, isLoading: false, error: result.error });
      } else {
        setState({ data: result.data, isLoading: false, error: null });
      }
    } catch (error) {
      setState({ data: null, isLoading: false, error: error as Error });
    }
  }, [apiFunc]);

  useEffect(() => {
    if (apiFunc) {
      loadData();
    }
  }, [apiFunc, loadData]);

  return { ...state, refetch: loadData };
};
