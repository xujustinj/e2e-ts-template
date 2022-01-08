import { MikroORM, EntityRepository } from "@mikro-orm/core";

import { Config } from "../config";
import { DataProvider } from "../data";
import { MikroThingEntity } from "./entities/thing.entity";
import { MikroThingRepo } from "./repos/mikro-thing-repo";
import { DBConfig, MikroOptions } from "./config";

export interface MikroDataProvider extends DataProvider {
  mikroORM: MikroORM;
  mikroEntityRepos: {
    thing: EntityRepository<MikroThingEntity>;
  };
  repos: {
    thing: MikroThingRepo;
  };
}

export async function mikroDataProvider(
  config: Config
): Promise<MikroDataProvider> {
  const options = MikroOptions(DBConfig(config));
  const mikroORM = await MikroORM.init(options);

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
