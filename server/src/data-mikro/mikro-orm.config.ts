import { config } from "../config";
import { getMikroConfig } from "./config";
import { getMikroOptions } from "./mikro-orm";

// the migrations CLI requires an options object as a default export
export default getMikroOptions(getMikroConfig(config));
