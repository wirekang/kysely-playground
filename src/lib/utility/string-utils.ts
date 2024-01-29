export class StringUtils {
  static trimPrefix(s: string, prefix: string) {
    if (s.startsWith(prefix)) {
      return s.slice(prefix.length);
    }
    return s;
  }

  static capitalize(s: string) {
    return s.charAt(0).toUpperCase() + s.substring(1);
  }
}
