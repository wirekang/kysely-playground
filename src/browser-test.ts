import { logger } from "./lib/log/logger";
import { TypescriptManager } from "./lib/typescript/typescript-manager";
import { HotkeyUtils } from "./lib/utility/hotkey-utils";

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

HotkeyUtils.register("s", { ctrl: true }, () => {
  logger.info("ctrl-s");
});
HotkeyUtils.register("s", { ctrl: true, shift: true }, () => {
  logger.info("ctrl-shift-s");
});