import "./reset.css";
import "./index.css";

import { logger } from "./lib/log/logger";
import { FragmentRepository } from "./lib/fragment-repository";

logger.info("entrypoint");
logger.debug(JSON.stringify(import.meta.env));
new FragmentRepository();
