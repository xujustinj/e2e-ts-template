import { ThingNotFoundRepoError } from "../../data/errors";
import { ThingRepo } from "../../data/repos";
import { ID, Thing } from "../../model";
import {
  ThingNotFoundServiceError,
  UnexpectedServiceError,
} from "../../service/errors";
import { ThingService } from "../../service/services";
import { ServiceResult } from "../../service/types";

export class BaseThingService implements ThingService {
  constructor(protected readonly thingRepo: ThingRepo) {}

  public async create(description: string): ServiceResult<Thing> {
    return (await this.thingRepo.create({ description })).mapFail(
      (err) => new UnexpectedServiceError(err)
    );
  }

  public async read(): ServiceResult<ReadonlyArray<Thing>> {
    return (await this.thingRepo.readAll(null)).mapFail(
      (err) => new UnexpectedServiceError(err)
    );
  }

  public async update(
    id: ID,
    description: string
  ): ServiceResult<Thing, ThingNotFoundServiceError> {
    return (await this.thingRepo.updateWhere({ id }, { description })).mapFail(
      (err) =>
        err instanceof ThingNotFoundRepoError
          ? new ThingNotFoundServiceError(err.query)
          : new UnexpectedServiceError(err)
    );
  }

  public async delete(
    id: ID
  ): ServiceResult<string, ThingNotFoundServiceError> {
    return (await this.thingRepo.deleteWhere({ id }))
      .map(({ description }) => description)
      .mapFail((err) =>
        err instanceof ThingNotFoundRepoError
          ? new ThingNotFoundServiceError(err.query)
          : new UnexpectedServiceError(err)
      );
  }
}
