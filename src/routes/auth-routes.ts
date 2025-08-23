import { Router } from 'express'
import { AuthController } from '@/controllers/auth-controller'
import { upload } from '@/middlewares/multer';
const authRouter = Router();
const authController = new AuthController();

authRouter.post('/login', authController.login.bind(authController))
authRouter.post('/register', upload.single("avatar"), authController.register.bind(authController))

export default authRouter;
