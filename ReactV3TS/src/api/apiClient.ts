import { SuperbaseResponse } from "@/types/function.types";

export const apiClient = async <T>(
  url: string,
  options?: RequestInit
): Promise<SuperbaseResponse<T>> => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });
    if (response.status === 204) {
      return {
        data: null as T,
        error: null,
        status: 204,
        statusText: "No Content",
      };
    }
    const data = response.ok ? await response.json() : null;
    return {
      data,
      error: response.ok ? null : new Error(`http Error${response.status}`),
      status: response.status,
      statusText: response.statusText,
    };
  } catch (e) {
    return {
      data: null,
      error: e as Error,
      status: 500,
      statusText: `Internal Client Error:${url}`,
    };
  }
};
