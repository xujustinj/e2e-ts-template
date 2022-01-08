import * as trpcExpress from "@trpc/server/adapters/express";

export function createContext({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) {
  // TODO: user authentication
  return {
    req,
    res,
  };
}

export type Context = ReturnType<typeof createContext>;
