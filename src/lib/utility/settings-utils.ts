import { LOCALSTORAGE_SETTINGS, SETTING_DEFAULTS, SETTING_KEYS } from "../constants";

export class SettingsUtils {
  static get(settingKey: (typeof SETTING_KEYS)[number]): boolean {
    const key = LOCALSTORAGE_SETTINGS + settingKey;
    const item = localStorage.getItem(key);
    if (item === null) {
      return SETTING_DEFAULTS[settingKey];
    }
    return item === "1";
  }

  static set(settingKey: (typeof SETTING_KEYS)[number], value: boolean) {
    const key = LOCALSTORAGE_SETTINGS + settingKey;
    localStorage.setItem(key, value ? "1" : "0");
  }
}
