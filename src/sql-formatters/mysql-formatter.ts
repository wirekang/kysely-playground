import { SqlFormatter } from "./sql-formatter";
import { mysql } from "sql-formatter";

export class MysqlFormatter extends SqlFormatter {
  constructor() {
    super(mysql);
  }
}
