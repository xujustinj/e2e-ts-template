import { config } from "../config";
import { DBConfig, MikroOptions } from "./config";

// the migrations CLI requires an options object as a default export
export default MikroOptions(DBConfig(config));
