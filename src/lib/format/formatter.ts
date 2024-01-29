export class Formatter {
  dialect: string = null as any;
  constructor() {}

  async formatTs(v: string, options: { printWidth: number; semi: boolean; singleQuote: boolean }) {
    const { format } = await import("prettier/standalone");
    const { default: tsPlugin } = await import("prettier/plugins/typescript");
    const { default: estree } = await import("prettier/plugins/estree");
    return format(v, { ...options, parser: "typescript", plugins: [tsPlugin, estree] });
  }

  async formatSql(
    v: string,
    parameters: Array<unknown>,
    options: { inlineParameters: boolean; upperKeywords: boolean },
  ) {
    const { format } = await import("sql-formatter");
    const language: any = {
      mysql: "mysql",
      postgres: "postgresql",
      sqlite: "sqlite",
      mssql: "tsql",
    }[this.dialect];
    return format(v, {
      language,
      keywordCase: options.upperKeywords ? "upper" : "preserve",
      params: options.inlineParameters ? this.getParams(parameters.map(inline)) : undefined,
      paramTypes: this.getParamTypes(),
    });
  }

  private getParams(parameters: Array<unknown>) {
    if (!["postgres", "mssql"].includes(this.dialect)) {
      return parameters;
    }
    const rst: any = {};
    parameters.forEach((it, i) => {
      rst[i + 1] = it;
    });
    return rst;
  }

  private getParamTypes(): any {
    if (this.dialect === "mssql") {
      return { numbered: ["@"] };
    }
    return undefined;
  }
}

function inline(v: any): string {
  if (typeof v === "string") {
    return `'${v}'`;
  }
  return `${v}`;
}
