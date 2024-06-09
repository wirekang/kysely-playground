// @ts-ignore
import toastify from "toastify-js";

export class ToastUtils {
  static show(level: "trace" | "info" | "error", text: string) {
    toastify({
      text,
      duration: 400 + text.length * 100,
      newWindow: true,
      position: "center",
      gravity: "bottom",
    }).showToast();
  }
}
