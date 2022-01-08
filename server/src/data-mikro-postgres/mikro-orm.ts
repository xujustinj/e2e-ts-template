import { MikroORM, Options } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";
import path from "path";

import { MikroConfig } from "./config";

export function getMikroOptions(mikroConfig: MikroConfig): Options {
  return {
    host: mikroConfig.host,
    port: mikroConfig.port,
    dbName: mikroConfig.database_name,
    user: mikroConfig.username,
    password: mikroConfig.password,
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

export async function setupMikroORM(
  mikroConfig: MikroConfig
): Promise<MikroORM> {
  return await MikroORM.init(getMikroOptions(mikroConfig));
}
