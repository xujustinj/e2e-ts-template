import { createReactQueryHooks } from "@trpc/react";

import type { APIRouter } from "@xujustinj/ts-backend-template/src/api-express-trpc";

export const trpc = createReactQueryHooks<APIRouter>();
