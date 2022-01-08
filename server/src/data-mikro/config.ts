import { Options } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";
import path from "path";

import { Config, parser } from "../config";

export function DBConfig(config: Config) {
  return {
    host: config.get("DB_HOST"),
    port: config.parse("DB_PORT", parser.port, { fallback: 5432 }),
    database_name: config.get("DB_DATABASE_NAME"),
    username: config.get("DB_USERNAME"),
    password: config.get("DB_PASSWORD"),
  };
}
export type DBConfig = ReturnType<typeof DBConfig>;

export function MikroOptions(db: DBConfig): Options {
  return {
    host: db.host,
    port: db.port,
    dbName: db.database_name,
    user: db.username,
    password: db.password,
    driver: PostgreSqlDriver,
    debug: true, // process.env.NODE_ENV !== 'production'
    highlighter: new SqlHighlighter(),
    entities: ["dist/data-mikro/entities/*.entity.js"],
    entitiesTs: ["src/data-mikro/entities/*.entity.ts"], // path to TS entities (source), relative to `baseDir`
    metadataProvider: TsMorphMetadataProvider,
    migrations: {
      disableForeignKeys: false,
      path: path.join(__dirname, "migrations"), // path to the folder with migrations
      pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
    },
    type: "postgresql",
  };
}
