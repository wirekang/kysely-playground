export class ButtonController {
  constructor(private readonly element: HTMLElement) {}

  onClick(cb: () => unknown) {
    this.element.addEventListener("click", cb);
  }
}
