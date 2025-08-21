import { AuthApiError } from "@supabase/supabase-js";
import { Error } from "@/types/Error";
import { HTTP_STATUS } from "@/constants/http-status";

export function refractError(error: unknown): Promise<Error> {
  let formattedError: Error = {
    name: "UnknownError",
    message: "Une erreur inconnue s'est produite",
    status: HTTP_STATUS.INTERNAL_SERVER_ERROR.code,
  };

  if (error instanceof AuthApiError) {
    formattedError = {
      name: error.name,
      message: error.message,
      status: error.status,
      code: error.code,
      stack: error.stack,
    };
  } else if (error instanceof Error) {
    formattedError = {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
  }

  return Promise.resolve(formattedError);
}

