import { DEBOUNCE_TIME, DEBOUNCE_TIME_LOWER } from "../constants.js";
import { SettingsUtils } from "./settings-utils.js";

export class AsyncUtils {
  private static getDebounceTime() {
    if (SettingsUtils.get("editor:lower-debounce-time")) {
      return DEBOUNCE_TIME_LOWER;
    }
    return DEBOUNCE_TIME;
  }

  static makeDebounceTimeout(cb: () => unknown) {
    let t: any = undefined;
    const ms = AsyncUtils.getDebounceTime();
    return () => {
      clearTimeout(t);
      t = setTimeout(cb, ms);
    };
  }

  static makeEventQueue() {
    let running = false;
    const queue: any[] = [];
    const handle = async () => {
      if (running) {
        setTimeout(handle, 1);
        return;
      }
      const e = queue.shift();
      if (!e) {
        return;
      }
      try {
        running = true;
        await e();
      } finally {
        running = false;
        handle();
      }
    };
    return (cb: () => Promise<void>) => {
      queue.push(cb);
      handle();
    };
  }
}
