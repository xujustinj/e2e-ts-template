import { ThingQuery } from "../../model";
import { ServiceError } from "./service-error";

export class NotFoundServiceError<
  Query,
  Typename extends string = string
> extends ServiceError {
  constructor(
    public readonly typename: Typename,
    public readonly query: Query
  ) {
    super(`No ${typename} could be found matching ${query}.`);
  }
}

export class ThingNotFoundServiceError extends NotFoundServiceError<
  ThingQuery,
  "Thing"
> {
  constructor(query: ThingQuery) {
    super("Thing", query);
  }
}
