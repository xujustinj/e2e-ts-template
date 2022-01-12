import type { ID, Thing } from "../../model";
import type { ThingNotFoundServiceError } from "../errors";
import type { ServiceResult } from "../types";

/**
 * Example CRUD service for Things
 */
export interface ThingService {
  create(description: string): ServiceResult<Thing>;

  read(): ServiceResult<ReadonlyArray<Thing>>;

  update(
    id: ID,
    description: string
  ): ServiceResult<Thing, ThingNotFoundServiceError>;

  delete(id: ID): ServiceResult<string, ThingNotFoundServiceError>;
}
