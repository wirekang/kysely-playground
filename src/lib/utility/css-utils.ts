import { CSS_MIN_WIDE_WIDTH, LOCALSTORAGE_THEME } from "../constants";
import { logger } from "./logger";

export class CssUtils {
  static isWideScreen() {
    return window.innerWidth >= CSS_MIN_WIDE_WIDTH;
  }

  static colorSchemaEffect(cb: (light: boolean) => unknown) {
    const onMutate = () => {
      const theme = document.body.getAttribute("data-theme");
      cb(theme === "light");
    };
    new MutationObserver(onMutate).observe(document.body, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    onMutate();
  }

  static initSavedTheme() {
    let theme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    const saved = localStorage.getItem(LOCALSTORAGE_THEME);
    if (saved !== null) {
      logger.debug("use saved theme", saved);
      theme = saved;
    }
    CssUtils.setTheme(theme, false);
  }

  static getTheme() {
    return document.body.getAttribute("data-theme");
  }

  static setTheme(theme: string, save: boolean) {
    logger.debug("set theme", theme);
    document.body.setAttribute("data-theme", theme);
    if (save) {
      logger.debug("save theme", theme);
      localStorage.setItem(LOCALSTORAGE_THEME, theme);
    }
  }
}
