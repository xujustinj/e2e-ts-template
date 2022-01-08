import { Result } from "typescript-monads";

import { ServiceError, UnexpectedServiceError } from "./errors";

// UnexpectedServiceError is always a possible result
export type ServiceResult<T, Err extends ServiceError = never> = Promise<
  Result<T, Err | UnexpectedServiceError>
>;
