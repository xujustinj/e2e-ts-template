import * as repos from "./repos";

export interface DataProvider {
  repos: {
    thing: repos.ThingRepo;
  };
}
