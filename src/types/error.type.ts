
export interface AppError {
  success: false;
  message: string;
  status: number;
  details?: any; // ex: stack, metadata
}
