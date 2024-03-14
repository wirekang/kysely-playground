import { LOCALSTORAGE_SETTINGS, SETTING_DEFAULTS, SETTING_KEYS } from "../constants";

const cache: Map<string, boolean> = new Map();

export class SettingsUtils {
  static get(settingKey: (typeof SETTING_KEYS)[number]): boolean {
    const key = LOCALSTORAGE_SETTINGS + settingKey;
    if (cache.has(key)) {
      return cache.get(key) as boolean;
    }
    const item = localStorage.getItem(key);
    let value = item === "1";
    if (item === null) {
      value = SETTING_DEFAULTS[settingKey];
    }
    cache.set(key, value);
    return value;
  }

  static set(settingKey: (typeof SETTING_KEYS)[number], value: boolean) {
    const key = LOCALSTORAGE_SETTINGS + settingKey;
    localStorage.setItem(key, value ? "1" : "0");
    cache.set(key, value);
  }
}
