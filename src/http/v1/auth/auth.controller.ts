import { auth } from "@/lib/auth";
import { Elysia, t } from "elysia";

export const AuthController = new Elysia();

AuthController.post(
  "/api/auth/sign-in/email",
  async ({ body }) => {
    const data = await auth.api.signInEmail({ body }).catch((e) => e);

    return data;
  },
  {
    body: t.Object({
      email: t.RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
      password: t.String(),
    }),
  }
);

AuthController.get("/api/auth/get-session", async ({ headers }) => {
  const data = await auth.api
    .getSession({ headers: headers as HeadersInit })
    .catch((e) => e);

  return data;
});

AuthController.post(
  "/api/auth/sign-up/email",
  ({ body }) => {
    const result = auth.api.signUpEmail({ body }).catch((e) => e);
    return result;
  },
  {
    body: t.Object({
      name: t.String(),
      email: t.RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
      password: t.String(),
    }),
  }
);

AuthController.post("/api/auth/sign-in/social", async () => {
  const data = await auth.api.signInSocial({ body: { provider: "google" } });
  console.log("data :", data);
});
