import config from "@xujustinj/common-config";
import cors from "cors";

import { middleware, setupExpresstRPCAPIProvider } from "./api-express-trpc";
import { setupMikroDataProvider } from "./data-mikro-postgres";
import { setupBaseServiceProvider } from "./service-base";

async function main() {
  const dataProvider = await setupMikroDataProvider(config);
  const serviceProvider = setupBaseServiceProvider(dataProvider);
  const apiProvider = setupExpresstRPCAPIProvider(serviceProvider, config, {
    extraMiddleware: [
      cors(),
      middleware.logRequest(),
      middleware.mikroRequestContext(dataProvider.mikroORM.em),
    ],
  });
  apiProvider.server.start();
}

main();
