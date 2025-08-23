import { AuthApiError } from "@supabase/supabase-js";
import { AppError } from "@/types/error.type";
import { HTTP_STATUS } from "@/constants/http-status";

export function customRefractError(error: unknown): AppError {
  let formattedError: AppError = {
    success: false,
    message: "Une erreur inconnue s'est produite",
    status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
  };

  if (error instanceof AuthApiError) {
    formattedError = {
      success: false,
      message: error.message || "Une erreur inconnue s'est produite",
      status: error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR,
    };
  } else if (error instanceof Error) {
    formattedError = {
      success: false,
      message: error.message || "Une erreur inconnue s'est produite",
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    };
  }

  return formattedError;
}
