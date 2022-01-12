import { z } from "zod";

import type { ThingService } from "../../service/services/thing-service";
import { trpcUnwrap } from "../utils/trpc-unwrap";
import { router } from "../utils/router";

export function setupThingRouter(thingService: ThingService) {
  return router()
    .mutation("create", {
      input: z.object({
        description: z.string(),
      }),
      async resolve({ input: { description } }) {
        return trpcUnwrap(await thingService.create(description));
      },
    })
    .query("read", {
      async resolve() {
        return trpcUnwrap(await thingService.read()).map((things) => ({
          things,
        }));
      },
    })
    .mutation("update", {
      input: z.object({
        id: z.number(),
        description: z.string(),
      }),
      async resolve({ input: { id, description } }) {
        return trpcUnwrap(await thingService.update(id, description));
      },
    })
    .mutation("delete", {
      input: z.object({
        id: z.number(),
      }),
      async resolve({ input: { id } }) {
        return trpcUnwrap(await thingService.delete(id));
      },
    });
}
export type ThingRouter = ReturnType<typeof setupThingRouter>;
