import { ServiceError } from "./service-error";

/**
 * Catch-all error for anything not covered by other errors.
 */
export class UnexpectedServiceError extends ServiceError {
  constructor(protected readonly cause: unknown) {
    super(`Unexpected error in service: ${cause}`);
  }
}
