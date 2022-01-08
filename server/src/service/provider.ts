import * as services from "./services";

export interface ServiceProvider {
  services: {
    thing: services.ThingService;
  };
}
