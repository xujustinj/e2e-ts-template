import { config, parser } from "./config";

const name = config.get("NAME", { fallback: "world" });
const port = config.parse("SERVER_PORT", parser.port);
console.log(
  `Hello ${name}! This will eventually be the Express server on port ${port}.`
);
