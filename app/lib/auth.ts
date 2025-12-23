import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import env from "~/lib/env";

import db from "./db/index";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
  }),
  socialProviders: {
    github: {
      clientId: env.AUTH_GITHUB_CLIENT_ID as string,
      clientSecret: env.AUTH_GITHUB_CLIENT_SECRET as string,
    },
  },
});
