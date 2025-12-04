import { betterAuthMiddleware } from "@/lib/auth";
import { Elysia } from "elysia";

export const UserController = new Elysia();

UserController.use(betterAuthMiddleware).get("/user", ({ user }) => user, {
  auth: true,
});

UserController.use(betterAuthMiddleware).get(
  "/profile",
  ({ user }) => {
    console.log("User", user);
    return "Fetched User";
  },
  {
    auth: true,
  }
);
