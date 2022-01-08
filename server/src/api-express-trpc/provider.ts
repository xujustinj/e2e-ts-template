import { Config } from "../config";
import { ServiceProvider } from "../service";
import { setupAPIRouter } from "./api";
import { getExpressConfig } from "./config";
import { ExpressServerOptions, setupExpressServer } from "./server";

export function setupExpresstRPCAPIProvider(
  service: ServiceProvider,
  config: Config,
  expressOptions: ExpressServerOptions
) {
  const expressConfig = getExpressConfig(config);
  const apiRouter = setupAPIRouter(service);
  const server = setupExpressServer(apiRouter, expressConfig, expressOptions);
  return { server };
}
export type ExpresstRPCAPIProvider = ReturnType<
  typeof setupExpresstRPCAPIProvider
>;
