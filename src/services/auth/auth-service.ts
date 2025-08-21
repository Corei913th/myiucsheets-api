import { singleton } from 'tsyringe'
import { supabase } from '@/config/supabase/supabase'
import { User } from '@/types/User'
import { RegisterDTO } from '@/dtos/auth/register-dto'
import { refractError } from '@/utils/error'
import { LoginDTO } from '@/dtos/auth/login-dto'
import { HTTP_STATUS } from '@/constants/http-status'

@singleton()
export class AuthService<User> {
  
  async register(dto: RegisterDTO): Promise<User | unknown> {
    try {
      const { data, error } = await supabase.from('users').insert([dto]).single()
      if (error) throw error
      return data!
    }
    catch(err){
      const formattedError = await refractError(err);
      return {
        success: false,
        message: formattedError.message,
        status: formattedError.status || HTTP_STATUS.INTERNAL_SERVER_ERROR.code,
      };
    }
  }

  async  login(dto: LoginDTO): Promise<unknown> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword(dto);
      if (error) throw error;
      return data;
    } catch (error) {
      const formattedError = await refractError(error);
      return {
        success: false,
        message: formattedError.message,
        status: formattedError.status || HTTP_STATUS.INTERNAL_SERVER_ERROR.code
      };
  }
}

}
