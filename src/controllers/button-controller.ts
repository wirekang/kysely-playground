export class ButtonController {
  constructor(private readonly element: HTMLElement) {}

  onClick(cb: () => unknown) {
    this.element.addEventListener("click", cb);
  }

  setOpacity(o: string) {
    this.element.style.opacity = o;
  }

  remove() {
    this.element.remove();
  }
}
