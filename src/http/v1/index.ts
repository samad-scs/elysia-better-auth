import Elysia from "elysia";
import { AuthController } from "./auth/auth.controller";
import { UserController } from "./user/user.controller";

export const httpV1 = new Elysia();

httpV1.use(AuthController);
httpV1.use(UserController);
