import type { MikroORM, EntityRepository } from "@mikro-orm/core";

import type { Config } from "../config";
import type { DataProvider } from "../data";
import { MikroThingEntity } from "./entities/thing.entity";
import { MikroThingRepo } from "./repos/mikro-thing-repo";
import { getMikroConfig } from "./config";
import { setupMikroORM } from "./mikro-orm";

export interface MikroDataProvider extends DataProvider {
  mikroORM: MikroORM;
  mikroEntityRepos: {
    thing: EntityRepository<MikroThingEntity>;
  };
  repos: {
    thing: MikroThingRepo;
  };
}

export async function setupMikroDataProvider(
  config: Config
): Promise<MikroDataProvider> {
  const mikroConfig = getMikroConfig(config);
  const mikroORM = await setupMikroORM(mikroConfig);

  const { em } = mikroORM;
  const mikroEntityRepos = {
    thing: em.getRepository(MikroThingEntity),
  };

  await mikroORM.getMigrator().up();

  const repos = {
    thing: new MikroThingRepo(mikroEntityRepos.thing),
  };

  return {
    mikroORM,
    mikroEntityRepos,
    repos,
  };
}
