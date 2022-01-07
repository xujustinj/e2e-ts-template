export { parser } from "./parser";
export type { Config, ConfigKey } from "./types";

// Configuring what we use for configuration leads to the chicken-egg problem.
// Instead, we hard-code our configuration setup with a very reasonable default.
import { ObjectConfig } from "./implementations";
export const config = new ObjectConfig(process.env);
