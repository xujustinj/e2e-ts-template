import { TRPCError } from "@trpc/server";
import type { Result } from "typescript-monads";

import { NotFoundServiceError } from "../../service/errors";

type TRPCErrorParams = ConstructorParameters<typeof TRPCError>[0];

export function trpcUnwrap<T>(result: Result<T, TRPCErrorParams | Error>): T {
  return result
    .mapFail((err) => {
      if (!(err instanceof Error)) {
        throw new TRPCError(err); // err has type TRPCErrorParams
      }
      if (err instanceof NotFoundServiceError) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: err.message,
          cause: err,
        });
      }
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    })
    .unwrap();
}
