import { createExpressMiddleware } from "@trpc/server/adapters/express";
import express from "express";

import { APIRouter } from "../api";
import { ExpressConfig } from "../config";
import { createContext } from "../utils/context";

export interface ExpressServerOptions {
  extraMiddleware?: Array<express.RequestHandler>;
}

export function setupExpressServer(
  apiRouter: APIRouter,
  expressConfig: ExpressConfig,
  options?: ExpressServerOptions
) {
  const extraMiddleware = options?.extraMiddleware;

  const app = express();
  if (extraMiddleware !== undefined) {
    app.use(extraMiddleware);
  }
  app.use(createExpressMiddleware({ router: apiRouter, createContext }));

  // TODO: HTTPS
  const start = () =>
    app.listen(expressConfig.port, () => {
      console.log(`Express server started on port ${expressConfig.port}`);
    });

  return { app, start };
}
export type ExpressServer = ReturnType<typeof setupExpressServer>;
