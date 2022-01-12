import * as Mikro from "@mikro-orm/core";

import type { Thing } from "../../model";
import { BaseMikroEntity } from "./base-entity";

@Mikro.Entity()
export class MikroThingEntity extends BaseMikroEntity implements Thing {
  @Mikro.Property({ columnType: "text" })
  description!: string;
}
