export class Hightlighter {
  static async init() {
    const { default: hljs } = await import("highlight.js/lib/core");
    const { default: hljsSql } = await import("highlight.js/lib/languages/sql");
    const { default: hljsPlaintext } = await import("highlight.js/lib/languages/plaintext");
    hljs.registerLanguage("sql", hljsSql);
    hljs.registerLanguage("plaintext", hljsPlaintext);
    return new Hightlighter(hljs);
  }

  private constructor(private readonly hljs: any) {}

  highlight() {
    this.hljs.highlightAll();
  }
}
