export class ToastController {
  private hideTimeout?: any;
  constructor(private readonly element: HTMLElement) {}

  show(message: string) {
    this.hide();
    setTimeout(() => {
      this.element.classList.add("show");
      this.element.innerHTML = message;
      clearTimeout(this.hideTimeout);
      this.hideTimeout = setTimeout(this.hide.bind(this), 1000 + message.length * 50);
    }, 250);
  }

  hide() {
    this.element.classList.remove("show");
  }
}
