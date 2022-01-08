import { DataProvider } from "../data";
import { ServiceProvider } from "../service";
import { BaseThingService } from "./services";

export interface BaseServiceProvider extends ServiceProvider {}

export function setupBaseServiceProvider(
  data: DataProvider
): BaseServiceProvider {
  const { repos } = data;
  const services = {
    thing: new BaseThingService(repos.thing),
  };
  return { services };
}
