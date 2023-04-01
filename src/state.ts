import { SqlDialect } from "./typings/state";
import { SqlFormatOptions, TypescriptFormatOptions } from "./typings/formatter";
import { KyselyVersionManager } from "./kysely-version-manager";

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
      injectParameters: false,
    };
    this.typescriptFormatOptions = { printWidth: 70, semi: false, singleQuote: true };
    this.kyselyVersion = KyselyVersionManager.LATEST;
    this.ts = "";
  }
}
