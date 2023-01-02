import { SqlCompiler } from "./sql-compiler";

export class SqliteCompiler extends SqlCompiler {
  constructor() {
    super("SqliteDialect");
  }
}
