// @ts-ignore
import toastify from "toastify-js";

export class ToastUtils {
  static show(level: "trace" | "info" | "error", text: string) {
    toastify({
      text,
      duration: 500 + text.length * 40,
      newWindow: true,
      position: "center",
      gravity: "bottom",
    }).showToast();
  }
}
