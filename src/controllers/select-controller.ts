export class SelectController {
  private options: Array<Option> = [];
  constructor(private readonly element: HTMLSelectElement) {}

  setOptions(v: Array<Option | string>) {
    this.options = v.map((it) => {
      if (typeof it === "string") {
        return { label: it, value: it };
      }
      return it;
    });
    this.element.innerHTML = "";
    this.options.map((option) => {
      const tag = document.createElement("option");
      tag.value = option.value;
      tag.innerText = option.label;
      this.element.appendChild(tag);
    });
  }

  setValue(optionValue: string) {
    this.element.value = optionValue;
  }

  getValue() {
    return this.element.value;
  }

  onChange(cb: (v: string) => unknown) {
    this.element.addEventListener("change", () => {
      cb(this.element.value);
    });
  }
}

export type Option = {
  value: string;
  label: string;
};
