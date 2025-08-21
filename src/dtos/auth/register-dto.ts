import { IsEmail, IsEmpty, IsNotEmpty } from 'class-validator'

export class RegisterDTO {

  @IsNotEmpty()
  full_name!: string 

  @IsEmail()
  email!: string

  @IsNotEmpty()
  password! : string

  @IsEmpty()
  photo_url? : string      
}
