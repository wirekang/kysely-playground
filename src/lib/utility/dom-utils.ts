export class DomUtils {
  static getSearchParam(name: string) {
    return new URLSearchParams(location.search).get(name);
  }

  static hasSearchParam(name: string) {
    return !!DomUtils.getSearchParam(name);
  }

  static isMac() {
    return navigator.userAgent.toLowerCase().includes("mac");
  }
}
