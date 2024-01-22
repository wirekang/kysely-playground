import { EditorController } from "./controllers/editor-controller";
import { SwitchThemeController } from "./controllers/switch-theme-controller";
import { CssUtils } from "./lib/utility/css-utils";
import { logger } from "./lib/utility/logger";

function e(id: string): HTMLElement {
  const r = document.getElementById(id);
  if (!r) {
    throw Error("wrong id");
  }
  return r;
}

logger.info("kysely-playground");
logger.debug("env:", import.meta.env);
CssUtils.initSavedTheme();
new SwitchThemeController(e("switch-theme"));

await EditorController.init(e("panel-0"), {
  language: "typescript",
});

await EditorController.init(e("panel-1"), {
  language: "typescript",
});

await EditorController.init(e("panel-2"), {
  language: "sql",
});
