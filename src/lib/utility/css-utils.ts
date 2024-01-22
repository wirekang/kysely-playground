import { CSS_MIN_WIDE_WIDTH } from "../constants";

export class CssUtils {
  static isWideScreen() {
    return window.innerWidth >= CSS_MIN_WIDE_WIDTH;
  }

  static colorSchemaEffect(cb: (light: boolean) => unknown) {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", (event) => {
      cb(!event.matches);
    });
    cb(!media.matches);
  }
}
