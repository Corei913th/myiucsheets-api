import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";
import { Express } from "express";

export class CreateUserDTO {
  @IsNotEmpty()
  full_name!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  password!: string;

  @IsOptional()
  avatar?: Express.Multer.File;

  @IsNotEmpty()
  role!: string;
}
