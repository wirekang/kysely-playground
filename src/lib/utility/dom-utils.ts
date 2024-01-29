export class DomUtils {
  static inIframe() {
    return window.parent !== window.top;
  }
}
