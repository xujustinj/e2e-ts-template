import type { Config } from "@xujustinj/common-config";
import { parser } from "@xujustinj/common-config";

export function getExpressConfig(config: Config) {
  return { port: config.parse("SERVER_PORT", parser.port) } as const;
}
export type ExpressConfig = ReturnType<typeof getExpressConfig>;
