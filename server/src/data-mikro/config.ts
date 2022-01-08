import { Config, parser } from "../config";

export function getMikroConfig(config: Config) {
  return {
    host: config.get("DB_HOST"),
    port: config.parse("DB_PORT", parser.port, { fallback: 5432 }),
    database_name: config.get("DB_DATABASE_NAME"),
    username: config.get("DB_USERNAME"),
    password: config.get("DB_PASSWORD"),
  };
}
export type MikroConfig = ReturnType<typeof getMikroConfig>;
