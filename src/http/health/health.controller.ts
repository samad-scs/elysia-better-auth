import { prisma } from "@/lib/prisma";
import { Elysia, t } from "elysia";

export const HealthController = new Elysia();

HealthController.get(
  "/health",
  async () => ({
    status: "ok",
    db: await prisma.$queryRaw`SELECT 1`.then(() => "ok").catch(() => "error"),
  }),
  {
    response: t.Object({
      status: t.String(),
      db: t.String(),
    }),
  }
);
