export class ToastController {
  private hideTimeout?: any;
  constructor(private readonly element: HTMLElement) {}

  show(message: string) {
    this.element.classList.add("show");
    this.element.innerHTML = message;
    clearTimeout(this.hideTimeout);
    this.hideTimeout = setTimeout(this.hide.bind(this), 400 + message.length * 40);
  }

  hide() {
    this.element.classList.remove("show");
  }
}
