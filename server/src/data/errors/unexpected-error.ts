import { RepoError } from "./repo-error";

/**
 * Catch-all error for anything not covered by other errors.
 */
export class UnexpectedRepoError extends RepoError {
  constructor(public readonly cause: unknown) {
    super(`Unexpected error in repo: ${cause}`);
  }
}
