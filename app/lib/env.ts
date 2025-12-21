import { z } from "zod";

import tryParseEnv from "./try-parse-env";

const EnvSchema = z.object({
  NODE_ENV: z.string(),
});

export type TEnvSchema = z.infer<typeof EnvSchema>;

tryParseEnv(EnvSchema);
// eslint-disable-next-line node/no-process-env
export const env = EnvSchema.parse(process.env);
