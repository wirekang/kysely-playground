import { KeywordCase } from "sql-formatter";

export const config: {
  dialect: "mysql" | "postgres" | "sqlite";
  formatOptions: {
    keywordCase: KeywordCase;
  };
} = {
  dialect: "mysql",
  formatOptions: {
    keywordCase: "upper",
  },
};
