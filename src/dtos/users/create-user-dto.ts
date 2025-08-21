import { IsEmail, IsNotEmpty, IsEmpty } from 'class-validator'

export class CreateUserDTO {
  @IsNotEmpty()
  full_name!: string 
  
  @IsEmail()
  email!: string
  
  @IsNotEmpty()
  password! : string

  @IsEmpty()
  photo_url? : string   
}
