import { SqlFormatter } from "./sql-formatter";
import { postgresql } from "sql-formatter";

export class PostgresFormatter extends SqlFormatter {
  constructor() {
    super(postgresql);
  }

  protected override parseParams(p: string[]) {
    const rst: any = {};
    p.forEach((value, i) => {
      rst[i + 1] = value;
    });
    return rst;
  }
}
