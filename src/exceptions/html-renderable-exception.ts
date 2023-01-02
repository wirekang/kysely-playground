export class HtmlRenderableException extends Error {
  readonly #html: string;
  constructor(message: string, html: string) {
    super(message);
    this.#html = html.trim();
  }

  public render(): string {
    return this.#html;
  }
}
