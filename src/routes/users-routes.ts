import { Router } from 'express'
import { UsersController } from '@/controllers/users-controller'
const userRouter = Router()
const usersController = new UsersController()

userRouter.get('/', usersController.getUsers.bind(usersController))
userRouter.post('/', usersController.createUser.bind(usersController))

export default userRouter;
