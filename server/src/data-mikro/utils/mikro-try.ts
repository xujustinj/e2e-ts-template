import { Result } from "typescript-monads";

import { RepoError, UnexpectedRepoError } from "../../data/errors";
import { RepoResult } from "../../data/types";

export async function mikroTry<T, Err extends RepoError>(
  action: () => Promise<Result<T, Err>>
): RepoResult<T, Err> {
  try {
    return await action();
  } catch (err: unknown) {
    return Result.fail(new UnexpectedRepoError(err));
  }
}
