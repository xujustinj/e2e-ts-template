import { ThingQuery } from "../../model";
import { RepoError } from "./repo-error";

export class NotFoundRepoError<
  Query,
  Typename extends string = string
> extends RepoError {
  constructor(
    public readonly typename: Typename,
    public readonly query: Query
  ) {
    super(`No ${typename} could be found matching ${query}.`);
  }
}

export class ThingNotFoundRepoError extends NotFoundRepoError<
  ThingQuery,
  "Thing"
> {
  constructor(query: ThingQuery) {
    super("Thing", query);
  }
}
