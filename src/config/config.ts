import { KeywordCase } from "sql-formatter";
import { SQLDialect } from "../typings/dialect";

export const config: {
  dialect: SQLDialect;
  formatOptions: {
    keywordCase: KeywordCase;
  };
} = {
  dialect: "mysql",
  formatOptions: {
    keywordCase: "upper",
  },
};
