import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { AuthService } from '@/services/auth/auth-service'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { RegisterDTO } from '@/dtos/auth/register-dto'
import { refractError } from '@/utils/error'
import { HTTP_STATUS } from '@/constants/http-status'
import { LoginDTO } from '@/dtos/auth/login-dto'

export class AuthController {
  private authService = container.resolve(AuthService)
  
    async register(req: Request, res: Response) : Promise<unknown> {
      try {
        const dto = plainToInstance(RegisterDTO, req.body)
        const errors = await validate(dto)
        if (errors.length > 0) return res.status(HTTP_STATUS.BAD_REQUEST.code).json(errors)
        const user = await this.authService.register(dto)
        res.status(HTTP_STATUS.CREATED.code).json(user)
      }
      catch(err){
        const formattedError = await refractError(err);
        res.status(formattedError.status || HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ success: false, message: formattedError.message })
      }
    }

    async login(req: Request, res: Response) : Promise<unknown> {
      try {
        const dto = plainToInstance(LoginDTO, req.body)
        const errors = await validate(dto)
        if (errors.length > 0) return res.status(HTTP_STATUS.BAD_REQUEST.code).json(errors)
        const user = await this.authService.login(dto)
        res.status(HTTP_STATUS.OK.code).json(user)
      }
      catch(err){
        const formattedError = await refractError(err);
        res.status(formattedError.status || HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ success: false, message: formattedError.message })
      }
    }
}