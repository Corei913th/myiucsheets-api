

export type Error = {
  cause?: unknown;
  code?: string;
  message: string;
  name: string;
  status?: number;
  stack?: string;
};