import { EntityManager, RequestContext } from "@mikro-orm/core";
import express from "express";

export namespace middleware {
  export type Middleware = express.RequestHandler;

  export function mikroRequestContext(em: EntityManager): Middleware {
    return (_req, _res, next) => RequestContext.create(em, next);
  }

  export function logRequest(): Middleware {
    return (req, _res, next) => {
      console.log(req.method, req.path, req.body ?? req.query);
      next();
    };
  }
}
