import { EditorController } from "./controllers/editor-controller";
import { logger } from "./lib/utility/logger";

logger.info("kysely-playground");
logger.debug("env:", import.meta.env);

await EditorController.init(document.getElementById("panel-0")!, {
  language: "typescript",
});
await EditorController.init(document.getElementById("panel-1")!, {
  language: "typescript",
});
await EditorController.init(document.getElementById("panel-2")!, {
  language: "sql",
});
