import { logger } from "./lib/log/logger";
import { TypescriptManager } from "./lib/typescript/typescript-manager";

TypescriptManager.init().then((manager) => {
  manager.modules.forEach((m) => {
    m.transpile("const a=3")
      .then((r) => {
        logger.info(`ts ${m.version}: ${r}`);
      })
      .catch((e) => {
        logger.error(`ts ${m.version}: ${e}`);
      });
  });
});
