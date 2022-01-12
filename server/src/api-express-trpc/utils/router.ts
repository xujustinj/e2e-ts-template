import { router as trpcRouter } from "@trpc/server";

import type { Context } from "./context";

export function router() {
  return trpcRouter<Context>();
}
export type Router = ReturnType<typeof router>;
