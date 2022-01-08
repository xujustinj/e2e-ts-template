import { Thing, ThingQuery, UniqueThingQuery, Values } from "../../model";
import { ThingNotFoundRepoError } from "../errors";
import { RepoResult } from "../types";

export interface ThingRepo {
  create(props: Values<Thing>): RepoResult<Thing>;

  exists(query: ThingQuery): RepoResult<boolean>;

  readOne(query: ThingQuery): RepoResult<Thing, ThingNotFoundRepoError>;
  readAll(query: ThingQuery): RepoResult<ReadonlyArray<Thing>>;

  updateThing(thing: Thing, values: Partial<Values<Thing>>): RepoResult<Thing>;
  updateWhere(
    query: UniqueThingQuery,
    values: Partial<Values<Thing>>
  ): RepoResult<Thing, ThingNotFoundRepoError>;

  deleteThing(thing: Thing): RepoResult<Values<Thing>>;
  deleteWhere(
    query: UniqueThingQuery
  ): RepoResult<Values<Thing>, ThingNotFoundRepoError>;
}
