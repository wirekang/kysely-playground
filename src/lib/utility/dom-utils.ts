export class DomUtils {
  static inIframe() {
    try {
      return window.self !== window.top;
    } catch {
      return true;
    }
  }
}
