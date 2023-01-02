import { SqlCompiler } from "./sql-compiler";

export class PostgresCompiler extends SqlCompiler {
  constructor() {
    super("PostgresDialect");
  }
}
