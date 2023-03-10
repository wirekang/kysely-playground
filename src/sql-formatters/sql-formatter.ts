import { SqlFormatOptions } from "../typings/formatter";
import { DialectOptions, formatDialect } from "sql-formatter";

export abstract class SqlFormatter {
  readonly #dialect: DialectOptions;

  protected constructor(dialect: DialectOptions) {
    this.#dialect = dialect;
  }

  public async format(
    v: {
      sql: string;
      parameters: readonly unknown[];
    },
    options: SqlFormatOptions
  ) {
    return formatDialect(v.sql, {
      dialect: this.#dialect,
      params: this.parseParams(v.parameters.map((v) => this.escapeParam(v))),
      keywordCase: options.keywordCase,
    });
  }

  protected parseParams(v: string[]): any {
    return v;
  }

  protected escapeParam(v: any): string {
    if (typeof v !== "string") {
      return `${v}`;
    }
    return `'${v}'`;
  }
}
