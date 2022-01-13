import { ServiceProvider } from "../service";
import * as routes from "./routes";
import { router } from "./utils/router";

export function setupAPIRouter({ services }: ServiceProvider) {
  const thingRouter = routes.setupThingRouter(services.thing);
  return router().merge("things", thingRouter);
}
export type APIRouter = ReturnType<typeof setupAPIRouter>;
