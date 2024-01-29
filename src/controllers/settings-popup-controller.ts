export class settingPopupController {
  constructor(private readonly root: HTMLElement) {}

  toggle() {
    if (this.root.hasAttribute("hidden")) {
      this.root.removeAttribute("hidden");
    } else {
      this.root.setAttribute("hidden", "");
    }
  }

  private append(cb: (item: HTMLDivElement) => unknown) {
    const tag = document.createElement("div");
    tag.classList.add("settings-item");
    cb(tag);
    this.root.appendChild(tag);
  }

  appendHeading(v: string) {
    return this.append((item) => {
      const heading = document.createElement("div");
      heading.textContent = `[${v}]`;
      heading.classList.add("heading");
      item.appendChild(heading);
    });
  }

  appendBooleanInput(name: string, defaultValue: boolean, cb: (v: boolean) => unknown) {
    return this.append((item) => {
      const container = document.createElement("div");
      container.classList.add("input-container");
      const label = document.createElement("div");
      label.classList.add("label");
      label.textContent = name;
      const checkbox = document.createElement("div");
      checkbox.classList.add("checkbox");
      container.addEventListener("click", () => {
        if (checkbox.classList.contains("checked")) {
          checkbox.classList.remove("checked");
          cb(false);
        } else {
          checkbox.classList.add("checked");
          cb(true);
        }
      });
      if (defaultValue) {
        checkbox.classList.add("checked");
      }
      container.appendChild(checkbox);
      container.appendChild(label);
      item.appendChild(container);
    });
  }

  appendText(v: string) {
    return this.append((item) => {
      const text = document.createElement("div");
      text.classList.add("text");
      text.textContent = v;
      item.appendChild(text);
    });
  }
}
