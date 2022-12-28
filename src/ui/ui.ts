import { KYSELY_VERSION } from "../copytype/constants";
import "prismjs";
import "prismjs/components/prism-sql";
import "prismjs/themes/prism.css";
import "./prism-pgsql";
import { highlight, languages } from "prismjs";
import { SQLDialect } from "../typings/dialect";

export const events: {
  onChangeDialect?: (v: "mysql" | "postgres" | "sqlite") => void;
} = {};

const e = <T extends HTMLElement>(id: string): T => {
  const r = document.getElementById(id);
  if (r === null) {
    throw new Error(`no ${id}`);
  }
  return r as T;
};

const elements = {
  header: e("header"),
  dialect: e<HTMLSelectElement>("dialect"),
  version: e("kysely-version"),
  mainContainer: e("main-container"),
  inputContainer: e("input-container"),
  outputContainer: e("output-container"),
  sql: e("sql"),
  error: e("error"),
};

export function setSqlText(sql: string, dialect: SQLDialect) {
  const lang = dialectToPrismLanguage(dialect);
  elements.sql.innerHTML = highlight(sql, languages[lang], lang);
}

function dialectToPrismLanguage(dialect: SQLDialect) {
  switch (dialect) {
    case "mysql":
      return "sql";
    default:
      return "pgsql";
  }
}

export function setErrorText(e?: string) {
  if (!e) {
    elements.error.classList.add("empty");
    return;
  }
  elements.error.classList.remove("empty");
  elements.error.textContent = e;
}

elements.version.textContent = `kysely: ${KYSELY_VERSION}`;

elements.dialect.addEventListener("change", () => {
  events.onChangeDialect && events.onChangeDialect(elements.dialect.value as any);
});
