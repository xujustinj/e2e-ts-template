import { ID } from "../types";

export type UniqueThingQuery = { id: ID };
export type ThingQuery = null | UniqueThingQuery;
