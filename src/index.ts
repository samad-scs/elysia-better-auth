import { cors } from "@elysiajs/cors";
import { fromTypes, openapi } from "@elysiajs/openapi";
import { Elysia } from "elysia";
import { scalarConfig } from "./configs/scalar.config";
import { HealthController } from "./http/health/health.controller";
import { httpV1 } from "./http/v1";

// ** Initialization
const app = new Elysia()
  .use(
    openapi({
      references: fromTypes(),
      scalar: scalarConfig,
    })
  )
  .use(
    cors({
      origin: ["http://localhost:7878", "http://localhost:3000"],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  )
  .listen(3000);

// ** Controllers
app.get("/", () => "Hello Elysia");
app.use(HealthController);
app.use(httpV1);

// ** LOGGING
console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
