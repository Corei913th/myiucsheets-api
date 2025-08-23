import { singleton } from "tsyringe";
import { supabase } from "@/config/supabase/supabase";
import { TABLES } from "@/constants/db";

@singleton()
export class StorageService {
  async uploadAvatar(file: Express.Multer.File, userId?: string) {
    const fileName = `profiles/${userId ?? "avatar"}${Date.now()}-${
      file.originalname
    }`;

    const { error } = await supabase.storage
      .from(TABLES.AVATARS)
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error) throw error;

    const { data } = supabase.storage
      .from(TABLES.AVATARS)
      .getPublicUrl(fileName);

    return data.publicUrl;
  }
}
