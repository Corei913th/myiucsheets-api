import "reflect-metadata";
import { container } from "tsyringe";
import { UsersService } from "@/services/users-service";
import { AuthService } from "@/services/auth-service";
import { StorageService } from "./services/storage-service";

// Register services globally
container.registerSingleton(AuthService);
container.registerSingleton(UsersService);
container.registerSingleton(StorageService);
