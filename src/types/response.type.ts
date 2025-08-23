export type Response<T = any> = {
  count?: number;
  data: T | null;
  message: string;
  success: boolean;
};
