import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";
import { Express } from "express";

export class LoginDTO {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  password!: string;
}

export class RegisterDTO {
  @IsNotEmpty()
  full_name!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  password!: string;

  @IsOptional()
  avatar?: Express.Multer.File;
}
