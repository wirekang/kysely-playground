import { logger } from "./lib/utility/logger";
logger.info("kysely-playground");
logger.debug("env:", import.meta.env);

import { LEGACY_PLAYGROUND_URL } from "./lib/constants";

import { EditorController } from "./controllers/editor-controller";
import { SwitchThemeController } from "./controllers/switch-theme-controller";
import { CssUtils } from "./lib/utility/css-utils";
import { StateManager } from "./lib/state/state-manager";

function e(id: TemplateStringsArray): HTMLElement {
  const r = document.getElementById(id[0]);
  if (!r) {
    throw Error(`no element: ${id}`);
  }
  return r;
}

async function bootstrap() {
  const stateManager = new StateManager();
  CssUtils.initSavedTheme();
  new SwitchThemeController(e`switch-theme`);

  const typeEditor = await EditorController.init(e`panel-0`, {
    language: "typescript",
  });

  const queryEditor = await EditorController.init(e`panel-1`, {
    language: "typescript",
  });
}

bootstrap();
