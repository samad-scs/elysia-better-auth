import Elysia from "elysia";
import { UserController } from "./user/user.controller";

export const httpV1 = new Elysia();

httpV1.use(UserController);
