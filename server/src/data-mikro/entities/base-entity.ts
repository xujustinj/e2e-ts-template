import * as Mikro from "@mikro-orm/core";
import { Entity } from "../../model";

export abstract class BaseMikroEntity implements Entity {
  @Mikro.PrimaryKey()
  id!: number;

  @Mikro.Property()
  createdOn = new Date();

  @Mikro.Property({ onUpdate: () => new Date() })
  updatedOn = new Date();
}
