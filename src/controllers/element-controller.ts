export class ElementController {
  constructor(readonly element: HTMLElement) {}

  onClick(cb: () => unknown) {
    this.element.addEventListener("click", cb);
  }

  setOpacity(o: string) {
    this.element.style.opacity = o;
  }

  remove() {
    this.element.remove();
  }

  setHidden(v: boolean) {
    if (v) {
      this.element.setAttribute("hidden", "");
    } else {
      this.element.removeAttribute("hidden");
    }
  }

  isHidden() {
    return this.element.hasAttribute("hidden");
  }
}
