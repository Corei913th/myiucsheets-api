import { singleton } from "tsyringe";
import { supabase } from "@/config/supabase/supabase";
import { container } from "tsyringe";
import { User } from "@/types/user.type";
import { CreateUserDTO } from "@/dtos/users-dto";
import { TABLES } from "@/constants/db";
import { StorageService } from "./storage-service";
import { customResponse } from "@/utils/api-response";
import { Response } from "@/types/response.type";
import { buildUpdateData } from "@/utils/common";

@singleton()
export class UsersService {
  private storageService = container.resolve(StorageService);

  async getAll(): Promise<User[]> {
    const { data, error } = await supabase.from(TABLES.USERS).select("*");
    if (error) throw error;
    return data || [];
  }

  async getById(id: string): Promise<User | null> {
    const { data, error } = await supabase
      .from(TABLES.USERS)
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  }

  async create(dto: CreateUserDTO): Promise<Response<User>> {
    let avatarUrl: string | null = null;

    const { data: userData, error: userError } =
      await supabase.auth.admin.createUser({
        email: dto.email,
        password: dto.password,
        user_metadata: {
          full_name: dto.full_name,
          avatar_url: null,
          role: dto.role,
        },
      });

    if (userError) throw userError;

    if (dto.avatar && userData.user?.id) {
      avatarUrl = await this.storageService.uploadAvatar(
        dto.avatar,
        userData.user.id
      );

      const { error: profileError } = await supabase.auth.admin.updateUserById(
        userData.user.id,
        {
          user_metadata: {
            ...userData.user.user_metadata,
            avatar_url: avatarUrl,
          },
        }
      );
      if (profileError) throw profileError;
    }

    return customResponse(userData.user, "Utilisateur ajouté avec succès");
  }

  async update(
    id: string,
    dto: Partial<CreateUserDTO>
  ): Promise<Response<User>> {
    let avatarUrl: string | null = null;

    if (dto.avatar) {
      avatarUrl = await this.storageService.uploadAvatar(dto.avatar, id);
    }

    const updateData = buildUpdateData({
      email: dto.email,
      password: dto.password,
      user_metadata: buildUpdateData({
        full_name: dto.full_name,
        role: dto.role,
        avatar_url: avatarUrl,
      }),
    });

    const { data: userData, error: profileError } =
      await supabase.auth.admin.updateUserById(id, updateData);

    if (profileError) throw profileError;

    return customResponse(userData.user, "Utilisateur modifié avec succès");
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from(TABLES.USERS).delete().eq("id", id);
    if (error) throw error;
  }
}
