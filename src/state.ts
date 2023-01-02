import { SqlDialect } from "./typings/state";
import { SqlFormatOptions, TypescriptFormatOptions } from "./typings/formatter";

export class State {
  public dialect: SqlDialect;
  public sqlFormatOptions: SqlFormatOptions;
  public typescriptFormatOptions: TypescriptFormatOptions;
  public kyselyVersion: string;
  public ts: string;

  constructor() {
    this.dialect = "mysql";
    this.sqlFormatOptions = {
      keywordCase: "upper",
    };
    this.typescriptFormatOptions = { printWidth: 80, semi: false, singleQuote: true };
    this.kyselyVersion = "0.23.3";
    this.ts = "";
  }
}
