import "./reset.css";
import "./index.css";

import { logger } from "./lib/log/logger";

logger.info("kysely-playground");
logger.debug("env:", import.meta.env);

logger.debug(document);
window.addEventListener("keydown", (e) => {
  logger.debug(e);
});