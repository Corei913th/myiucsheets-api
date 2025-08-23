import { Request, Response } from "express";
import { container } from "tsyringe";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { AuthService } from "@/services/auth-service";
import { RegisterDTO } from "@/dtos/auth-dto";
import { LoginDTO } from "@/dtos/auth-dto";
import { customRefractError } from "@/utils/error";
import { HTTP_STATUS } from "@/constants/http-status";

export class AuthController {
  private authService = container.resolve(AuthService);

  async register(req: Request, res: Response): Promise<unknown> {
    try {
      const dto = plainToInstance(RegisterDTO, req.body);

      if (req.file) {
        dto.avatar = req.file;
      }
      const errors = await validate(dto);
      if (errors.length > 0)
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .json({ success: false, errors: errors });
      const user = await this.authService.register(dto);
      res.status(HTTP_STATUS.CREATED).json(user);
    } catch (err) {
      const formattedError = customRefractError(err);
      res
        .status(formattedError.status || HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json(formattedError);
    }
  }

  async login(req: Request, res: Response): Promise<unknown> {
    try {
      const dto = plainToInstance(LoginDTO, req.body);
      const errors = await validate(dto);
      if (errors.length > 0) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json(errors);
      }
      const user = await this.authService.login(dto);
      res.status(HTTP_STATUS.OK).json(user);
    } catch (err) {
      const formattedError = customRefractError(err);
      res
        .status(formattedError.status || HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json(formattedError);
    }
  }
}
