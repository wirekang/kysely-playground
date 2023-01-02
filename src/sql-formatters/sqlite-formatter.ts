import { SqlFormatter } from "./sql-formatter";
import { sqlite } from "sql-formatter";

export class SqliteFormatter extends SqlFormatter {
  constructor() {
    super(sqlite);
  }
}
