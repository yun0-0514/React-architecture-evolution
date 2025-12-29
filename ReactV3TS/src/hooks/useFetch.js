  import { useEffect, useState } from "react";

  export const useFetch = (apiFunc) => {
    const [state, setState] = useState({
      data: null,
      isLoading: true,
      error: null,
    });

    useEffect(() => {
      if (!apiFunc) return;
      const loadData = async () => {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));
        try {
          const result = await apiFunc();
          console.log(result);
          setState((prev) => ({
            ...prev,
            data: result,
            isLoading: false,
            error: null,
          }));
        } catch (err) {
          setState((prev) => ({ ...prev, isLoading: false, error: err.message }));
        }
      };
      loadData();
    }, [apiFunc]);

    return state;
  };
