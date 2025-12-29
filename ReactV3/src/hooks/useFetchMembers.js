import { useEffect, useReducer } from "react";
import { fetchMembers } from "../api/membersApi";

const initDataState = {
  data: [],
  isLoading: true,
  error: null,
  refetch: false,
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

const useFetchMembers = () => {
  const [state, dispatch] = useReducer(memberReducer, initDataState);

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

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchMembers();
      try {
        onFetch(result);
      } catch (err) {
        onError(err);
      }
    };

    fetchData();
  }, []); //현제는 url이 없으므로 의존성 배열은 빈 배열로 두는 것이 맞다면
  return { data: state.data, isLoading: state.isLodding, error: state.error };
};
export default useFetchMembers;
