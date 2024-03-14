import { DEBOUNCE_TIME, DEBOUNCE_TIME_LOWER } from "../constants.js";
import { SettingsUtils } from "./settings-utils.js";

export class PerformanceUtils {
  static getDebounceTime() {
    if (SettingsUtils.get("editor:lower-debounce-time")) {
      return DEBOUNCE_TIME_LOWER;
    }
    return DEBOUNCE_TIME;
  }
}
