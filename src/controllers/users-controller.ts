import { Request, Response } from "express";
import { container } from "tsyringe";
import { UsersService } from "@/services/users-service";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateUserDTO } from "@/dtos/users-dto";
import { HTTP_STATUS } from "@/constants/http-status";
import { customRefractError } from "@/utils/error";

export class UsersController {
  private usersService = container.resolve(UsersService);

  async createUser(req: Request, res: Response) {
    try {
      const dto = plainToInstance(CreateUserDTO, req.body);

      if (req.file) {
        dto.avatar = req.file;
      }
      const errors = await validate(dto);
      if (errors.length > 0)
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .json({ success: false, errors: errors });
      const user = await this.usersService.create(dto);
      res.status(HTTP_STATUS.CREATED).json(user);
    } catch (err) {
      const formattedError = customRefractError(err);
      res
        .status(formattedError.status || HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json(formattedError);
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const users = await this.usersService.getAll();
      res.status(HTTP_STATUS.OK).json({ count: users.length, data: users });
    } catch (err) {
      const formatedError = customRefractError(err);
      res
        .status(formatedError.status || HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json(formatedError);
    }
  }
}
