import { createReactQueryHooks } from "@trpc/react";

import type { APIRouter } from "@xujustinj/ts-backend-template";

export const trpc = createReactQueryHooks<APIRouter>();
