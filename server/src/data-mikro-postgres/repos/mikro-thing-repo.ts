import { Result } from "typescript-monads";
import { EntityRepository } from "@mikro-orm/core";

import { ThingNotFoundRepoError, RepoError } from "../../data/errors";
import { ThingRepo } from "../../data/repos";
import { RepoResult } from "../../data/types";
import { Thing, ThingQuery, UniqueThingQuery, Values } from "../../model";
import { MikroThingEntity } from "../entities/thing.entity";
import { mikroTry } from "../utils/mikro-try";

export class MikroThingRepo implements ThingRepo {
  constructor(protected er: EntityRepository<MikroThingEntity>) {}

  protected static compileQuery(query: ThingQuery) {
    return query === null ? {} : query;
  }

  private async findOneAnd<T, Err extends RepoError = never>(
    query: ThingQuery,
    onFound: (
      thing: MikroThingEntity
    ) => Result<T, Err | ThingNotFoundRepoError>
  ): RepoResult<T, Err | ThingNotFoundRepoError> {
    return mikroTry(async () => {
      const thing = await this.er.findOne(MikroThingRepo.compileQuery(query));
      return thing === null
        ? Result.fail(new ThingNotFoundRepoError(query))
        : onFound(thing);
    });
  }

  public async create(values: Values<Thing>): RepoResult<Thing> {
    return mikroTry(async () => Result.ok(this.er.create(values)));
  }

  public async exists(query: ThingQuery): RepoResult<boolean> {
    return mikroTry(async () =>
      Result.ok(
        (await this.er.findOne(MikroThingRepo.compileQuery(query))) !== null
      )
    );
  }
  public async readOne(
    query: ThingQuery
  ): RepoResult<Thing, ThingNotFoundRepoError> {
    return this.findOneAnd(query, (thing) => Result.ok(thing));
  }
  public async readAll(query: ThingQuery): RepoResult<ReadonlyArray<Thing>> {
    return mikroTry(async () =>
      Result.ok(await this.er.findAll(MikroThingRepo.compileQuery(query)))
    );
  }

  public async updateThing(
    thing: Thing,
    values: Partial<Values<Thing>>
  ): RepoResult<Thing> {
    return mikroTry(async () => Result.ok(this.er.assign(thing, values)));
  }
  public async updateWhere(
    query: UniqueThingQuery,
    values: Partial<Values<Thing>>
  ): RepoResult<Thing, ThingNotFoundRepoError> {
    return this.findOneAnd(query, (thing) =>
      Result.ok(this.er.assign(thing, values))
    );
  }

  public async deleteThing(thing: Thing): RepoResult<Values<Thing>> {
    return mikroTry(async () => {
      this.er.remove(thing);
      return Result.ok(thing);
    });
  }
  public async deleteWhere(
    query: UniqueThingQuery
  ): RepoResult<Values<Thing>, ThingNotFoundRepoError> {
    return this.findOneAnd(query, (thing) => {
      this.er.remove(thing);
      return Result.ok(thing);
    });
  }
}
