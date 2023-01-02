import { SqlCompiler } from "./sql-compiler";

export class MysqlCompiler extends SqlCompiler {
  constructor() {
    super("MysqlDialect");
  }
}
