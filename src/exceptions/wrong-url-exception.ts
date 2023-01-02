export class WrongUrlException extends Error {
  name = "WrongUrlException";
  constructor(inner: any) {
    super(`Can't parse url. It seems broken.\n${inner}`);
  }
}
