import "prismjs/components/prism-sql";
import "prismjs/components/prism-typescript";
import { SqlDialect } from "./typings/state";
import { highlight, languages } from "prismjs";
import { HtmlRenderableException } from "./exceptions/html-renderable-exception";

export class Controller {
  #e = {
    header: e("header"),
    headerButton: e("header-button"),
    sqlDialect: e<HTMLSelectElement>("sql-dialect"),
    example: e<HTMLSelectElement>("example"),
    kyselyVersion: e<HTMLSelectElement>("kysely-version"),
    mainContainer: e("main-container"),
    inputContainer: e("input-container"),
    outputContainer: e("output-container"),
    compiling: e("compiling"),
    sql: e("sql"),
    sqlParameters: e("sql-parameters"),
    error: e("error"),
    errorTitle: e("error-title"),
    errorBody: e("error-body"),
    loading: e("loading"),
    prettify: e("prettify"),
    share: e("share"),
    sharePopup: e("share-popup"),
    sharePopupClose: e("share-popup-close"),
    sharePopupShort: e("share-popup-short"),
    sharePopupUrl: e<HTMLInputElement>("share-popup-url"),
    sharePopupHelper: e("share-popup-helper"),
  };

  #isLoading = true;
  #loadingDotCount = 0;

  public onClickShareButton?: () => void;
  public onClickMakeShortUrlButton?: () => void;
  public onClickPrettifyButton?: () => void;
  public onChangeKyselyVersion?: (v: string) => void;
  public onChangeSqlDialect?: (v: SqlDialect) => void;
  public onChangeExampleName?: (v: string) => void;

  constructor(
    public sqlDialects: SqlDialect[],
    public exampleNames: string[],
    public kyselyVersions: string[]
  ) {
    sqlDialects.forEach((e) => {
      const option = document.createElement("option");
      option.textContent = e;
      option.value = e;
      this.#e.sqlDialect.append(option);
    });
    exampleNames.forEach((e) => {
      const option = document.createElement("option");
      option.textContent = e;
      option.value = e;
      this.#e.example.append(option);
    });
    kyselyVersions.forEach((e) => {
      const option = document.createElement("option");
      option.textContent = e;
      option.value = e;
      this.#e.kyselyVersion.append(option);
    });
    this.#e.share.addEventListener("click", () => {
      this.onClickShareButton && this.onClickShareButton();
    });
    this.#e.prettify.addEventListener("click", () => {
      this.onClickPrettifyButton && this.onClickPrettifyButton();
    });
    this.#e.sqlDialect.addEventListener("change", () => {
      this.onChangeSqlDialect && this.onChangeSqlDialect(this.#e.sqlDialect.value as SqlDialect);
    });
    this.#e.kyselyVersion.addEventListener("change", () => {
      this.onChangeKyselyVersion && this.onChangeKyselyVersion(this.#e.kyselyVersion.value);
    });
    this.#e.example.addEventListener("change", () => {
      this.onChangeExampleName && this.onChangeExampleName(this.#e.example.value);
    });
    this.#e.sharePopupClose.addEventListener("click", () => {
      this.hideSharePopup();
    });
    this.#e.sharePopupShort.addEventListener("click", () => {
      this.onClickMakeShortUrlButton && this.onClickMakeShortUrlButton();
    });
    this.#e.headerButton.addEventListener("click", () => {
      this.#e.header.classList.toggle("hidden");
    });
  }

  public setSqlDialect(v: string) {
    this.#e.sqlDialect.value = v;
  }

  public setKyselyVersion(v: string) {
    this.#e.kyselyVersion.value = v;
  }

  public setSqlText(v: string, dialect: SqlDialect) {
    const lang = dialectToPrismLanguage(dialect);
    this.#e.sql.innerHTML = highlight(v, languages[lang], lang);
  }

  public setSqlParameters(v: any[]) {
    this.#e.sqlParameters.innerHTML = "";
    if (!v || v.length === 0) {
      this.#e.sqlParameters.classList.add("hidden");
      return;
    }

    this.#e.sqlParameters.classList.remove("hidden");
    v.forEach((v, i) => {
      const key = document.createElement("div");
      key.classList.add("key");
      key.innerText = `${i + 1}`;

      const value = document.createElement("div");
      value.classList.add("value");
      const formatted = typeof v === "string" ? `'${v}'` : v;
      value.innerText = formatted;

      const div = document.createElement("div");
      div.classList.add("param");
      div.append(key, value);
      this.#e.sqlParameters.append(div);
    });
  }

  public showSharePopup() {
    this.#e.sharePopup.classList.remove("hidden");
  }

  public hideSharePopup() {
    this.#e.sharePopup.classList.add("hidden");
  }

  public setSharePopupHelperText(v: string) {
    this.#e.sharePopupHelper.textContent = v;
  }
  public setSharePopupLinkText(v?: string) {
    if (v === undefined) {
      this.#e.sharePopupUrl.classList.add("hidden");
      this.#e.sharePopupUrl.value = "";
    } else {
      this.#e.sharePopupUrl.classList.remove("hidden");
      this.#e.sharePopupUrl.value = v;
      this.#e.sharePopupUrl.focus();
      this.#e.sharePopupUrl.setSelectionRange(0, 100000);
    }
  }

  public setError(v?: any) {
    if (v === undefined) {
      this.#e.error.classList.add("hidden");
    } else {
      this.#e.error.classList.remove("hidden");
    }
    this.#e.errorBody.classList.add("hidden");
    if (v instanceof HtmlRenderableException) {
      this.#e.errorBody.classList.remove("hidden");
      this.#e.errorTitle.textContent = `${v.name}: ${v.message}`;
      this.#e.errorBody.innerHTML = v.render();
      return;
    }
    this.#e.errorTitle.textContent = v;
  }

  public showLoading() {
    this.#isLoading = true;
    this.#e.loading.classList.remove("hidden");
    this.#loadingCb();
  }

  public finishLoading() {
    this.#isLoading = false;
    this.#e.loading.classList.add("hidden");
  }

  #loadingCb() {
    if (!this.#isLoading) {
      return;
    }

    this.#loadingDotCount += 1;
    if (this.#loadingDotCount === 3) {
      this.#loadingDotCount = 0;
    }
    this.#e.loading.textContent = `LOADING${[...new Array(this.#loadingDotCount)]
      .map(() => `.`)
      .join("")}`;

    setTimeout(() => {
      this.#loadingCb();
    }, 300);
  }

  public showCompiling() {
    this.#e.compiling.classList.remove("hidden");
  }

  public hideCompiling() {
    this.#e.compiling.classList.add("hidden");
  }
}

const e = <T extends HTMLElement>(id: string): T => {
  const r = document.getElementById(id);
  if (r === null) {
    throw new Error(`no ${id}`);
  }
  return r as T;
};

function dialectToPrismLanguage(dialect: SqlDialect) {
  switch (dialect) {
    case "mysql":
      return "sql";
    default:
      return "pgsql";
  }
}
