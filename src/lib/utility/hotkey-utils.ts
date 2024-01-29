export class HotkeyUtils {
  static register(mods: Array<"ctrl" | "shift" | "alt">, key: string, cb: () => unknown) {
    const ctrl = mods.includes("ctrl");
    const shift = mods.includes("shift");
    const alt = mods.includes("alt");
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
