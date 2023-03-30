import "./styles/style.css";
import "./styles/prism-theme.css";
import "./styles/prism-pgsql";

import { Controller } from "./controller";
import { EXAMPLES, SQL_DIALECTS } from "./constatnts/state";
import { TypescriptEditor } from "./typescript-editor";
import { State } from "./state";
import { SqlCompiler } from "./sql-compilers/sql-compiler";
import { MysqlCompiler } from "./sql-compilers/mysql-compiler";
import { PostgresCompiler } from "./sql-compilers/postgres-compiler";
import { SqliteCompiler } from "./sql-compilers/sqlite-compiler";
import { TypescriptFormatter } from "./typescript-formatter";
import { SqlFormatter } from "./sql-formatters/sql-formatter";
import { MysqlFormatter } from "./sql-formatters/mysql-formatter";
import { PostgresFormatter } from "./sql-formatters/postgres-formatter";
import { SqliteFormatter } from "./sql-formatters/sqlite-formatter";
import { Store } from "./store";
import { StoreProviderString } from "./constatnts/store";
import { KyselyVersionManager } from "./kysely-version-manager";
import { KYSELY_GLOBAL_TYPE } from "./constatnts/editor";

(async () => {
  let sqlCompiler: SqlCompiler = 0 as any;
  let sqlFormatter: SqlFormatter = 0 as any;
  const tsFormatter = new TypescriptFormatter();
  const state = new State();
  const store = new Store();
  const versionManager = new KyselyVersionManager();
  const controller = newController();
  controller.showLoading();
  controller.setError();
  controller.hideSharePopup();
  const recreateSqlCompiler = () => {
    let c: SqlCompiler;
    switch (state.dialect) {
      case "postgres":
        c = new PostgresCompiler();
        break;
      case "sqlite":
        c = new SqliteCompiler();
        break;
      default:
        c = new MysqlCompiler();
    }
    c.kyselyModule = KyselyVersionManager.toModuleString(state.kyselyVersion);
    sqlCompiler = c;
  };
  const recreateSqlFormatter = () => {
    switch (state.dialect) {
      case "postgres":
        sqlFormatter = new PostgresFormatter();
        break;
      case "sqlite":
        sqlFormatter = new SqliteFormatter();
        break;
      default:
        sqlFormatter = new MysqlFormatter();
    }
  };
  const compile = async () => {
    controller.showCompiling();
    try {
      const result = await sqlCompiler.compile(state.ts);
      const sql = await sqlFormatter.format(result, state.sqlFormatOptions);
      controller.setSqlText(sql, state.dialect);
      controller.setError();
    } catch (e) {
      controller.setError(e);
    }
    controller.hideCompiling();
  };
  const editor = new TypescriptEditor("input-container");
  editor.onValueChange = async (ts) => {
    state.ts = ts;
    await compile();
  };
  controller.onClickShareButton = async () => {
    controller.showSharePopup();
    controller.setSharePopupLinkText();
    controller.setSharePopupHelperText("Loading...");
    const url = await store.save(
      { kyselyVersion: state.kyselyVersion, dialect: state.dialect, ts: state.ts },
      StoreProviderString.B64
    );
    controller.setSharePopupLinkText(url);
    navigator?.clipboard?.writeText(url).then(() => {
      controller.setSharePopupHelperText("Copied.");
    });
  };
  controller.onClickMakeShortUrlButton = async () => {
    controller.setSharePopupLinkText();
    controller.setSharePopupHelperText("Loading...");
    const url = await store.save(
      { kyselyVersion: state.kyselyVersion, dialect: state.dialect, ts: state.ts },
      StoreProviderString.Firebase
    );
    controller.setSharePopupLinkText(url);
    navigator?.clipboard?.writeText(url).then(() => {
      controller.setSharePopupHelperText("Copied.");
    });
  };
  controller.onClickPrettifyButton = async () => {
    const result = await tsFormatter.format(state.ts, state.typescriptFormatOptions);
    editor.value = result;
  };
  controller.onChangeKyselyVersion = async (v) => {
    controller.showLoading();
    state.kyselyVersion = v;
    await versionManager.setVersion(v);
    recreateSqlCompiler();
    controller.finishLoading();
    await compile();
  };
  controller.onChangeSqlDialect = (v) => {
    state.dialect = v;
    recreateSqlCompiler();
    recreateSqlFormatter();
    compile();
  };
  controller.onChangeExampleName = (v) => {
    const example = EXAMPLES[v];
    if (!example) {
      return;
    }
    editor.value = example.trim();
  };
  versionManager.onChangeTypeContent = (t) => {
    editor.setExtraLibs([
      { content: t, filePath: "file:///node_modules/@types/kysely/index.d.ts" },
      {
        content: KYSELY_GLOBAL_TYPE,
        filePath: "file:///kysely-global.ts",
      },
    ]);
  };
  await versionManager.setVersion(KyselyVersionManager.LATEST);
  recreateSqlCompiler();
  recreateSqlFormatter();
  try {
    const init = await store.load();
    if (init) {
      state.dialect = init.dialect ?? "mysql";
      const kv = init.kyselyVersion ?? KyselyVersionManager.LATEST;
      state.kyselyVersion = kv;
      controller.setSqlDialect(state.dialect);
      controller.setKyselyVersion(kv);
      recreateSqlCompiler();
      recreateSqlFormatter();
      editor.value = init.ts ?? "";
    }
  } catch (e) {
    controller.setError(e);
  }
  controller.finishLoading();
})();

function newController() {
  const exampleNames = ["--select example--", ...Object.keys(EXAMPLES)];
  const kyselyVersions = KyselyVersionManager.VERSIONS;
  return new Controller(SQL_DIALECTS, exampleNames, kyselyVersions);
}
