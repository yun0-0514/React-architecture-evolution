import { useEffect, useReducer, useState } from "react";
import { mockData } from "../constants/mockData";

const initDataState = {
  data: [],
  isLoading: true,
  error: null,
};

const memberReducer = (state, action) => {
  let fetchState;
  switch (action.type) {
    case "FETCH_SUCCESS":
      fetchState = {
        ...state,
        data: action.data,
        isLoading: false,
      };
      return fetchState;
    case "FETCH_ERROR":
      fetchState = {
        ...state,
        isLoading: false,
        error: action.data,
      };
      return fetchState;
    default:
      return state;
  }
};

export const useFetch = (url) => {
  const [state, dispatch] = useReducer(memberReducer, initDataState);
  const [refetchIndex, setRefetchIndex] = useState(0);
  const onFetch = (result) => {
    dispatch({
      type: "FETCH_SUCCESS",
      data: result,
    });
  };

  const onError = (err) => {
    dispatch({
      type: "FETCH_ERROR",
      data: err.message,
    });
  };

  const refetch = () => {
    setRefetchIndex((prev) => prev + 1);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        let result;
        if (url) {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`서버 응답 에러: ${response.status}`);
          }
          result = response.json();
        } else {
          await new Promise((resolve) => setTimeout(resolve, 500));
          const storageDataJson = localStorage.getItem("member");
          if (storageDataJson) {
            result = JSON.parse(storageDataJson);
          } else {
            result = mockData;
            localStorage.setItem("member", JSON.stringify(result));
          }
        }
        console.log("1. useFetch 데이터 로드 완료:", result);
        onFetch(result);
      } catch (error) {
        console.error("Data Load Error:", error);
        onError(error);
      }
    };
    loadData();
  }, [url, refetchIndex]);

  return {
    data: state.data,
    isLoading: state.isLoading,
    error: state.error,
    refetch,
  };
};
