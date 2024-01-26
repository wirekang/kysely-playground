export class ResultController {
  constructor(private readonly root: HTMLDivElement) {}

  clear() {
    this.root.innerText = "";
  }

  private append(cb: (container: HTMLDivElement) => unknown) {
    const tag = document.createElement("div");
    cb(tag);
    tag.classList.add("result-item");
    this.root.appendChild(tag);
  }

  appendPadding() {
    return this.append((container) => {
      const hr = document.createElement("hr");
      container.appendChild(hr);
    });
  }

  appendMessage(level: "warn" | "error" | "info" | "trace", message: string) {
    return this.append((container) => {
      const msg = document.createElement("div");
      msg.classList.add("message", level);
      msg.textContent = message;
      container.appendChild(msg);
    });
  }

  appendCode(language: string, value: string) {
    return this.append((container) => {
      const w = document.createElement("pre");
      w.classList.add("code");
      const code = document.createElement("code");
      code.classList.add(`language-${language}`, "hljs");
      code.textContent = value;
      w.appendChild(code);
      container.appendChild(w);
    });
  }
}
