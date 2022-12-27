import { KYSELY_VERSION } from "../copytype/constants";

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
};

export function setSqlHtml(html: string) {
  elements.sql.innerHTML = html;
}

elements.version.textContent = `kysely: ${KYSELY_VERSION}`;

elements.dialect.addEventListener("change", () => {
  events.onChangeDialect && events.onChangeDialect(elements.dialect.value as any);
});
