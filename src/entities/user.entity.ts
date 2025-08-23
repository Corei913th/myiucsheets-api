export interface UserEntity {
  id: string;
  email: string;
  full_name: string;
  role: string;
  avatar_url?: string | null;
}
