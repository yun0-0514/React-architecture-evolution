export interface AsyncState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

export interface SuperbaseResponse<T> {
  data: T | null;
  error: Error | null;
  count?: number | null;
  status: number;
  statusText: string;
}
