import { Result } from "typescript-monads";

import { RepoError, UnexpectedRepoError } from "./errors";

// UnexpectedRepoError is always a possible result
export type RepoResult<T, Err extends RepoError = never> = Promise<
  Result<T, Err | UnexpectedRepoError>
>;
