import { CssUtils } from "../lib/utility/css-utils";

export class SwitchThemeController {
  constructor(private readonly element: HTMLElement) {
    element.addEventListener("click", () => {
      const theme = CssUtils.getTheme() === "light" ? "dark" : "light";
      CssUtils.setTheme(theme);
    });
  }
}
