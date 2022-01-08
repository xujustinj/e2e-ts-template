import { Migration } from "@mikro-orm/migrations";

export class Migration20220108045820 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "mikro_thing_entity" ("id" serial primary key, "created_on" timestamptz(0) not null, "updated_on" timestamptz(0) not null, "description" text not null);'
    );
  }
}
