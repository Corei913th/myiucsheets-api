import { singleton } from 'tsyringe'
import { supabase } from '@/config/supabase/supabase'
import { User } from '@/types/User'
import { BaseService } from '../base-service'
import { CreateUserDTO } from '@/dtos/users/create-user-dto'

@singleton()
export class UsersService extends BaseService<User> {
  
  async getAll(): Promise<User[]> {
    const { data, error } = await supabase.from('users').select('*')
    if (error) throw error
    return data || []
  }

  async getById(id: string): Promise<User | null> {
    const { data, error } = await supabase.from('users').select('*').eq('id', id).single()
    if (error) throw error
    return data
  }

  async create(dto: CreateUserDTO): Promise<User> {
    const { data, error } = await supabase.from('users').insert([dto]).single()
    if (error) throw error
    return data!
  }

  async update(id: string, dto: Partial<CreateUserDTO>): Promise<User> {
    const { data, error } = await supabase.from('users').update(dto).eq('id', id).single()
    if (error) throw error
    return data!
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from('users').delete().eq('id', id)
    if (error) throw error
  }
}
