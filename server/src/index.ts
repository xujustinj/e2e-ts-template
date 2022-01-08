import { config, parser } from "./config";
import { mikroDataProvider } from "./data-mikro";
import { baseServiceProvider } from "./service-base";

async function main() {
  const dataProvider = await mikroDataProvider(config);
  baseServiceProvider(dataProvider);

  const name = config.get("NAME", { fallback: "world" });
  const port = config.parse("SERVER_PORT", parser.port);
  console.log(
    `Hello ${name}! This will eventually be the Express server on port ${port}.`
  );
}

main();
