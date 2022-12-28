import { KYSELY_VERSION } from "../copytype/constants";
import "prismjs";
import "prismjs/components/prism-sql";
import "./prism-pgsql";
import "../prism-theme.css";
import { highlight, languages } from "prismjs";
import { SQLDialect } from "../typings/dialect";
import { examples } from "../examples/examples";
import { prettify } from "../monaco/setup-editor";

export const events: {
  onChangeDialect?: (v: SQLDialect) => void;
  onChangeExample?: (ts: string) => void;
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
  example: e<HTMLSelectElement>("example"),
  version: e("kysely-version"),
  mainContainer: e("main-container"),
  inputContainer: e("input-container"),
  outputContainer: e("output-container"),
  sql: e("sql"),
  error: e("error"),
  loading: e("loading"),
  prettify: e("prettify"),
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
setErrorText();

elements.version.textContent = `${KYSELY_VERSION}`;

elements.dialect.addEventListener("change", () => {
  events.onChangeDialect && events.onChangeDialect(elements.dialect.value as any);
});

elements.example.append(document.createElement("option"));
elements.example.addEventListener("change", () => {
  const example = examples.find((v) => v.name === elements.example.value);
  if (!example) {
    return;
  }
  events.onChangeExample && events.onChangeExample(example.ts.trim());
});
examples.forEach((e) => {
  const option = document.createElement("option");
  option.textContent = e.name;
  option.value = e.name;
  elements.example.append(option);
});

let isLoading = true;
let dotCount = 1;

const loadingCb = () => {
  if (!isLoading) {
    return;
  }

  dotCount += 1;
  if (dotCount === 4) {
    dotCount = 1;
  }
  elements.loading.textContent = `LOADING${[...new Array(dotCount)].map(() => `.`).join("")}`;

  setTimeout(loadingCb, 300);
};

loadingCb();

export function onLoadingFinish() {
  isLoading = false;
  elements.loading.style.display = "none";
}

elements.prettify.addEventListener("click", () => {
  prettify();
});
