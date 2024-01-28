export class Formatter {
  dialect: string = null as any;
  constructor() {}

  async formatTs(v: string) {
    const { format } = await import("prettier/standalone");
    const { default: tsPlugin } = await import("prettier/plugins/typescript");
    const { default: estree } = await import("prettier/plugins/estree");
    return format(v, { printWidth: 70, parser: "typescript", plugins: [tsPlugin, estree] });
  }

  async formatSql(v: string) {
    const { format } = await import("sql-formatter");
    const language: any = {
      mysql: "mysql",
      postgres: "postgresql",
      sqlite: "sqlite",
      mssql: "tsql",
    }[this.dialect];
    return format(v, { language, keywordCase: "upper" });
  }
}
