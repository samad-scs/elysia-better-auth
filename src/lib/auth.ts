import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { oneTap, openAPI } from "better-auth/plugins";

import { Elysia } from "elysia";
import { prisma } from "./prisma";
import { fromTypes } from "@elysiajs/openapi";
import { scalarConfig } from "@/configs/scalar.config";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  socialProviders: {
    google: {
      prompt: "select_account consent",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  trustedOrigins: ["http://localhost:3000", "http://localhost:7878"],
  session: {
    storeSessionInDatabase: true,
  },
  rateLimit: {
    enabled: true,
    max: 10,
    window: 60 * 60 * 1000,
  },
  appName: "Elysia Get Started",
  plugins: [
    openAPI({
      theme: "bluePlanet",
    }),
    oneTap({}),
  ],
});

export const betterAuthMiddleware = new Elysia({ name: "better-auth" })
  .mount(auth.handler)
  .macro({
    auth: {
      async resolve({ status, request: { headers } }) {
        const session = await auth.api.getSession({
          headers,
        });
        if (!session) return status(401);
        return {
          user: session.user,
          session: session.session,
        };
      },
    },
  });
