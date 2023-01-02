import { TypescriptExampleException } from "./typescript-example-exception";

export class WrongResultException extends TypescriptExampleException {
  name = "WrongResultException";
  constructor() {
    super(
      'Variable "result" should be an Compilable such as SelectQueryBuilder.',
      "result = db.selectFrom('user').selectAll()"
    );
  }
}
