import { HtmlRenderableException } from "./html-renderable-exception";

export class TypescriptExampleException extends HtmlRenderableException {
  constructor(message: string, ts: string) {
    super(
      message,
      `
<div>
Example: 
<code class="language-ts">
${ts.trim()}
</code>
</div>
    `.trim()
    );
  }
}
