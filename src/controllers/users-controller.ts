import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UsersService } from '@/services/users/users-service'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { CreateUserDTO } from '@/dtos/users/create-user-dto'
import { HTTP_STATUS } from '@/constants/http-status'
import { refractError } from '@/utils/error'

export class UsersController {
  private usersService = container.resolve(UsersService)

  async createUser(req: Request, res: Response) {
    try {
      const dto = plainToInstance(CreateUserDTO, req.body)
      const errors = await validate(dto)
      if (errors.length > 0) return res.status(HTTP_STATUS.BAD_REQUEST.code).json(errors)

      const user = await this.usersService.create(dto)
      res.status(HTTP_STATUS.CREATED.code).json(user)
    }
    catch(err){
      const formatedError = await refractError(err);
      res.status(formatedError.status || HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ success : false, message : formatedError.message})
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const users = await this.usersService.getAll()
      res.status(HTTP_STATUS.OK.code).json({count : users.length, data : users})
    }
    catch(err){
      const formatedError = await refractError(err);
      res.status(formatedError.status || HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ success : false, message : formatedError.message})
    }
  }
}
