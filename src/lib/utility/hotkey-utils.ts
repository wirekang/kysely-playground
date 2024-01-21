export class HotkeyUtils {
  static register(key: string, mods: { ctrl?: boolean; shift?: boolean; alt?: boolean }, cb: () => unknown) {
    const ctrl = !!mods.ctrl;
    const shift = !!mods.shift;
    const alt = !!mods.alt;
    window.addEventListener("keydown", (e) => {
      if (
        e.key.toLowerCase() === key.toLowerCase() &&
        ctrl === e.ctrlKey &&
        shift === e.shiftKey &&
        alt === e.altKey
      ) {
        e.preventDefault();
        e.stopPropagation();
        cb();
      }
    });
  }
}
