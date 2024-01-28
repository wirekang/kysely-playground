import { logger } from "./lib/utility/logger";
import { EditorController } from "./controllers/editor-controller";
import { ButtonController } from "./controllers/button-controller";
import { CssUtils } from "./lib/utility/css-utils";
import { StateManager } from "./lib/state/state-manager";
import { FirestoreStateRepository } from "./lib/state/firestore-state-repository";
import { ToastController } from "./controllers/toast-controller";
import { SelectController } from "./controllers/select-controller";
import { KyselyManager } from "./lib/kysely/kysely-manager";
import { State } from "./lib/state/state";
import { HotkeyUtils } from "./lib/utility/hotkey-utils";
import { ResultController } from "./controllers/result-controller";
import { Executer } from "./lib/executer/executer";
import { Hightlighter } from "./lib/format/highlighter";
import { KyselyModule } from "./lib/kysely/kysely-module";
import { PlaygroundUtils } from "./lib/utility/playground-utils";
import { MonacoUtils } from "./lib/utility/monaco-utils";
import { TypescriptUtils } from "./lib/utility/typescript-utils";
import { StringUtils } from "./lib/utility/string-utils";
import { ClipboardUtils } from "./lib/utility/clipboard-utils";
import { Formatter } from "./lib/format/formatter";

const lazy = null as unknown;
const D = {
  resultController: lazy as ResultController,
  stateManager: lazy as StateManager,
  kyselyManager: lazy as KyselyManager,
  toastController: lazy as ToastController,
  kyselyModule: lazy as KyselyModule,
  versionController: lazy as SelectController,
  dialectController: lazy as SelectController,
  switchThemeController: lazy as ButtonController,
  viewController: lazy as ButtonController,
  hightlighter: lazy as Hightlighter,
  executer: lazy as Executer,
  state: lazy as State,
  typeEditorController: lazy as EditorController,
  queryEditorController: lazy as EditorController,
  panel0: lazy as HTMLElement,
  panel1: lazy as HTMLElement,
  panel2: lazy as HTMLElement,
  formatter: lazy as Formatter,
};

async function init() {
  function e(id: TemplateStringsArray): any {
    const r = document.getElementById(id[0]);
    if (!r) {
      throw Error(`no element: ${id}`);
    }
    return r;
  }
  D.panel0 = e`panel-0`;
  D.panel1 = e`panel-1`;
  D.panel2 = e`panel-2`;
  D.resultController = new ResultController(e`result`);
  setupResultController();
  D.stateManager = new StateManager(new FirestoreStateRepository());
  D.toastController = new ToastController(e`toast`);
  D.versionController = new SelectController(e`version`);
  D.dialectController = new SelectController(e`dialect`);
  D.switchThemeController = new ButtonController(e`switch-theme`);
  D.viewController = new ButtonController(e`view`);
  D.formatter = new Formatter();

  await Promise.all<any>([
    (async () => {
      D.kyselyManager = await KyselyManager.init();
    })(),
    (async () => {
      D.state = await D.stateManager.load();
      D.formatter.dialect = D.state.dialect;
    })(),
    (async () => {
      await MonacoUtils.init();
      await initQueryEditorController();
      await initTypeEditorController();
    })(),
    (async () => {
      D.hightlighter = await Hightlighter.init();
    })(),
  ]);
  initKyselyModule();
  initExecuter();
}

function setup() {
  setupPanels();
  setupVersionController();
  setupDialectController();
  setupSwitchThemeController();
  setupViewController();
  setupTypeEditorController();
  setupQueryEditorController();
  setupHotKeys();
  setupMonaco();
}

function initExecuter() {
  const entrypoints = D.kyselyModule.getEntrypoints();
  const mapping: Record<string, string> = {};
  entrypoints.forEach((e) => {
    mapping[e.module] = e.url;
  });
  D.executer = new Executer({
    ...mapping,
    playground: PlaygroundUtils.getEntrypointUrl(),
  });
}

async function initTypeEditorController() {
  D.typeEditorController = await EditorController.init(D.panel0, {
    language: "typescript",
    filePath: "node_modules/type-editor/index.ts",
  });
}

async function initQueryEditorController() {
  D.queryEditorController = await EditorController.init(D.panel1, {
    language: "typescript",
    filePath: "query-editor.ts",
  });
}

function setupResultController() {
  function handleUnexpectedError() {
    D.resultController.appendMessage(
      "error",
      `ERROR: There is an unexpected error. Checkout the developer console.`,
    );
  }
  window.addEventListener("error", handleUnexpectedError);
  window.addEventListener("unhandledrejection", handleUnexpectedError);
  D.resultController.clear();
  D.resultController.appendMessage("info", "Loading...");
  D.resultController.onClickCode = (v) => {
    copyText(v, "Code copied");
  };
}

function setupPanels() {
  if (D.state.hideType) {
    D.panel0.setAttribute("hidden", "");
  }
}

function setupVersionController() {
  D.versionController.setOptions(D.kyselyManager.getModuleIds());
  D.versionController.setValue(D.kyselyModule.id);
  D.versionController.onChange((id) => {
    const newModule = D.kyselyManager.getModule(id)!;
    patchState({
      kysely: {
        type: newModule.type,
        name: newModule.name,
      },
    });
  });
}

function setupDialectController() {
  D.dialectController.setOptions([...D.kyselyModule.dialects]);
  D.dialectController.setValue(D.state.dialect);
  D.dialectController.onChange((dialect: any) => {
    patchState({ dialect });
  });
}

function setupSwitchThemeController() {
  D.switchThemeController.onClick(CssUtils.toggleTheme.bind(null, true));
}

function setupViewController() {
  D.viewController.onClick(() => {
    if (D.panel0.hasAttribute("hidden")) {
      D.panel0.removeAttribute("hidden");
    } else {
      D.panel0.setAttribute("hidden", "");
    }
  });
}

function setupTypeEditorController() {
  D.typeEditorController.setValue(D.state.editors.type);
}

function setupQueryEditorController() {
  const header = PlaygroundUtils.makeQueryEditorHeader(D.state.dialect);
  D.queryEditorController.setValue(header + D.state.editors.query);
  D.queryEditorController.setHiddenHeader(header);

  D.queryEditorController.onChange(async (v) => {
    D.resultController.clear();
    D.resultController.appendMessage("info", "Compiling...");
    const js = await TypescriptUtils.transpile(v);
    D.resultController.clear();
    const outputs = await D.executer.execute(js);
    if (outputs.length === 0) {
      D.resultController.appendMessage("info", "Call kysely.execute()");
    }
    if (outputs.filter((it) => it.type === "query").length > 1) {
      D.resultController.appendMessage("info", "execute() has been called multiple times.");
      D.resultController.appendPadding();
    }
    logger.debug("execute outputs", outputs);
    for (const output of outputs) {
      switch (output.type) {
        case "transaction":
          D.resultController.appendMessage(
            "trace",
            `${StringUtils.capitalize(output.type2)}${StringUtils.capitalize(output.type)}`,
          );
          break;
        case "error":
          D.resultController.appendMessage("error", `Error`);
          D.resultController.appendCode("plaintext", output.message);
          break;
        case "query":
          let sql = output.sql;
          try {
            sql = await D.formatter.formatSql(sql);
          } catch (e) {
            D.resultController.appendMessage("error", "Failed to format");
          }
          D.resultController.appendCode("sql", sql);
          if (output.parameters.length > 0) {
            D.resultController.appendCode(
              "plaintext",
              output.parameters.map((p, i) => `[${i + 1}] ${p}`).join("\n"),
            );
            D.resultController.appendPadding();
          }
          break;
      }
    }
    D.hightlighter.highlight();
  });
}

async function bootstrap() {
  logger.info("kysely-playground");
  logger.debug("env:", import.meta.env);
  CssUtils.initTheme();
  await init();
  setup();
}

async function setupMonaco() {
  const typeFiles = await D.kyselyModule.loadTypeFiles();
  await Promise.all(
    typeFiles.map(async ({ data, path }) => {
      return MonacoUtils.addLib(`file:///node_modules/kysely/${path}`, data);
    }),
  );
  const dependencies: any = {
    "type-editor": "*",
  };
  D.kyselyModule.getEntrypoints().forEach(({ module }) => {
    dependencies[module] = "*";
  });
  await MonacoUtils.addLib(
    "file:///package.json",
    JSON.stringify({
      dependencies,
    }),
  );
}

function setupHotKeys() {
  HotkeyUtils.register(["ctrl"], "s", save.bind(null, false));
  HotkeyUtils.register(["ctrl", "shift"], "s", save.bind(null, true));
  HotkeyUtils.register(["ctrl"], "1", () => {
    D.typeEditorController.focus();
  });
  HotkeyUtils.register(["ctrl"], "2", () => {
    D.queryEditorController.focus();
  });
}

async function save(shorten: boolean) {
  let typeEditorValue = D.typeEditorController.getValue();
  let queryEditorValue = D.queryEditorController.getValue();
  try {
    typeEditorValue = await D.formatter.formatTs(typeEditorValue);
    queryEditorValue = await D.formatter.formatTs(queryEditorValue);
  } catch (e) {
    logger.error("Failed to format typescript\n", e);
    D.toastController.show("Failed to format typescript");
  }
  D.typeEditorController.setValue(typeEditorValue);
  D.queryEditorController.setValue(queryEditorValue);
  await D.stateManager.save(makeState(), shorten);
}

function makeState(): State {
  const s: State = {
    editors: {
      type: D.typeEditorController.getValue(),
      query: D.queryEditorController.getValue(),
    },
    dialect: D.state.dialect,
    kysely: {
      type: D.kyselyModule.type,
      name: D.kyselyModule.name,
    },
    hideType: D.panel0.hasAttribute("hidden") ? true : undefined,
  };
  logger.debug("newState", s);
  return s;
}

async function reloadState(s: State) {
  await D.stateManager.save(s, false);
  window.location.reload();
}

async function patchState(p: Partial<State>) {
  await reloadState({ ...makeState(), ...p });
}

function initKyselyModule() {
  if (D.state.kysely) {
    const m = D.kyselyManager.findModule(D.state.kysely.type, D.state.kysely.name);
    if (m) {
      D.kyselyModule = m;
      return;
    }
    D.toastController.show(`${D.state.kysely.type}:${D.state.kysely.name} not found.`);
  }
  D.kyselyModule = D.kyselyManager.getLatestTagModule();
}

async function copyText(v: string, msg: string) {
  try {
    await ClipboardUtils.writeText(v);
    D.toastController.show(msg);
  } catch (e: any) {
    D.toastController.show(e.message ?? e.toString());
  }
}

bootstrap();
