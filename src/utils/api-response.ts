import { Response } from "@/types/response.type";
import { Session, User } from "@supabase/supabase-js";
import { User as PublicUser } from "@/types/user.type";
import { SessionResponse } from "@/types/auth.type";

export function customAuthResponse(
  data: { user: Partial<User> | null; session: Session | null },
  action: "login" | "signup" = "login"
): Response<PublicUser | SessionResponse> {
  const { user, session } = data;
  const isLogin = action === "login";

  if (!user) {
    return {
      success: false,
      message: isLogin
        ? "Email ou mot de passe incorrect"
        : "Erreur lors de l' inscription.",
      data: null,
    };
  }

  const publicUser: PublicUser = {
    id: user.id,
    email: user.email,
    ...user.user_metadata,
  };

  const publicSession: SessionResponse = {
    access_token: session?.access_token ?? null,
    refresh_token: session?.refresh_token ?? null,
  };

  return {
    success: true,
    message: isLogin
      ? "Connexion réussie."
      : "Inscription réussie. Veuillez confirmer votre email.",
    data: isLogin ? publicSession : publicUser,
  };
}

export function mapSupabaseUser(user: Partial<User> | null): PublicUser | null {
  if (!user) return null;

  return {
    id: user.id,
    email: user.email,
    ...user.user_metadata,
  };
}

export function customResponse<T>(
  data: T | null,
  message?: string
): Response<T> {
  if (data) {
    const count = Array.isArray(data) ? data.length : undefined;

    return {
      success: true,
      message: message ?? "Opération réussie",
      data,
      count,
    };
  }

  return {
    success: false,
    message: message ?? "Aucune donnée trouvée",
    data: null,
  };
}
