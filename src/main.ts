import { logger } from "./lib/utility/logger";
import { bootstrap } from "./bootstrap";
import { CssUtils } from "./lib/utility/css-utils";

logger.info("kysely-playground");
logger.debug("env:", import.meta.env);
CssUtils.initTheme();
bootstrap();
