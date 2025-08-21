import 'reflect-metadata'
import { container } from 'tsyringe'
import { UsersService } from '@/services/users/users-service'
import { AuthService } from '@/services/auth/auth-service'

// Register services globally
container.registerSingleton(AuthService)
container.registerSingleton(UsersService)

