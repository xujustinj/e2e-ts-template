import { Result } from "typescript-monads";

import type { RepoError } from "../../data/errors";
import { UnexpectedRepoError } from "../../data/errors";
import type { RepoResult } from "../../data/types";

export async function mikroTry<T, Err extends RepoError>(
  action: () => Promise<Result<T, Err>>
): RepoResult<T, Err> {
  try {
    return await action();
  } catch (err: unknown) {
    console.error(err);
    return Result.fail(new UnexpectedRepoError(err));
  }
}
