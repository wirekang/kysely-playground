export class ValidateUtils {
  static typeEqual(v: unknown, type: string, name: string) {
    ValidateUtils.equal(typeof v, type, `typeof ${name}`);
  }

  static typeIncludes(v: unknown, types: Array<string>, name: string) {
    ValidateUtils.includes(typeof v, types, `typeof ${name}`);
  }

  static includes(element: unknown, coll: Array<unknown>, message: string) {
    if (!coll.includes(element)) {
      throw new ValidateError(`${message}\nexpected(includes): [${coll.join(", ")}]\nactual:  ${element}`);
    }
  }

  static equal(actual: unknown, expected: unknown, message: string) {
    if (actual !== expected) {
      throw new ValidateError(`${message}\nexpected: ${expected}\nactual:   ${actual}`);
    }
  }
}

class ValidateError extends Error {}
