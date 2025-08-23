import { singleton } from "tsyringe";
import { container } from "tsyringe";
import { supabase } from "@/config/supabase/supabase";
import { RegisterDTO, LoginDTO } from "@/dtos/auth-dto";
import { customAuthResponse } from "@/utils/api-response";
import { customRefractError } from "@/utils/error";
import { StorageService } from "./storage-service";
import { UserRole } from "@/enums/user-role.enum";
import { Response } from "../types/response.type";
import { SessionResponse } from "@/types/auth.type";
import { User } from "@/types/user.type";

@singleton()
export class AuthService {
  private storageService = container.resolve(StorageService);

  async register(dto: RegisterDTO): Promise<Response<User> | unknown> {
    try {
      let avatarUrl: string | null = null;

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: dto.email,
        password: dto.password,
        options: {
          data: {
            full_name: dto.full_name,
            avatar_url: null,
            role: UserRole.STUDENT,
          },
        },
      });

      if (authError) throw authError;

      if (dto.avatar) {
        avatarUrl = await this.storageService.uploadAvatar(
          dto.avatar,
          authData.user!.id
        );
      }

      if (authData.user?.id) {
        const { error: profileError } =
          await supabase.auth.admin.updateUserById(authData.user.id, {
            user_metadata: {
              avatar_url: avatarUrl,
            },
          });
        if (profileError) throw profileError;
      }

      return customAuthResponse(authData, "signup");
    } catch (err) {
      return customRefractError(err);
    }
  }

  async login(dto: LoginDTO): Promise<Response<SessionResponse> | unknown> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword(dto);
      if (error) throw error;
      return customAuthResponse(data);
    } catch (err) {
      return customRefractError(err);
    }
  }
}
