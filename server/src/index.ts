import { config, parser } from "./config";
import { mikroDataProvider } from "./data-mikro";

async function main() {
  await mikroDataProvider(config);

  const name = config.get("NAME", { fallback: "world" });
  const port = config.parse("SERVER_PORT", parser.port);
  console.log(
    `Hello ${name}! This will eventually be the Express server on port ${port}.`
  );
}

main();
