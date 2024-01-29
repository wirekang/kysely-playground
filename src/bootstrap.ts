import { logger } from "./lib/utility/logger";
import { EditorController } from "./controllers/editor-controller";
import { ElementController } from "./controllers/element-controller";
import { CssUtils } from "./lib/utility/css-utils";
import { StateManager } from "./lib/state/state-manager";
import { FirestoreStateRepository } from "./lib/state/firestore-state-repository";
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
import { ToastUtils } from "./lib/utility/toast-utils";
import { settingPopupController } from "./controllers/settings-popup-controller";
import { DEBUG, SETTING_KEYS } from "./lib/constants";
import { SettingsUtils } from "./lib/utility/settings-utils";
import { PanelContainerController } from "./controllers/panel-container-controller";
import { DomUtils } from "./lib/utility/dom-utils";

const lazy = null as unknown;
const D = {
  resultController: lazy as ResultController,
  stateManager: lazy as StateManager,
  kyselyManager: lazy as KyselyManager,
  kyselyModule: lazy as KyselyModule,
  versionController: lazy as SelectController,
  dialectController: lazy as SelectController,
  switchThemeController: lazy as ElementController,
  viewController: lazy as ElementController,
  hightlighter: lazy as Hightlighter,
  executer: lazy as Executer,
  state: lazy as State,
  typeEditorController: lazy as EditorController,
  queryEditorController: lazy as EditorController,
  panel0: lazy as ElementController,
  panel1: lazy as ElementController,
  panel2: lazy as ElementController,
  formatter: lazy as Formatter,
  settingsController: lazy as ElementController,
  settingPopupController: lazy as settingPopupController,
  mobileModeController: lazy as ElementController,
  loadingOverayController: lazy as ElementController,
  panelContainerController: lazy as PanelContainerController,
  openInNewtabController: lazy as ElementController,
};

async function init() {
  function e(id: TemplateStringsArray): any {
    const r = document.getElementById(id[0]);
    if (!r) {
      throw Error(`no element: ${id}`);
    }
    return r;
  }
  D.panel0 = new ElementController(e`panel-0`);
  D.panel1 = new ElementController(e`panel-1`);
  D.panel2 = new ElementController(e`panel-2`);
  D.panelContainerController = new PanelContainerController(e`panel-container`, [
    D.panel0.element,
    D.panel1.element,
    D.panel2.element,
  ]);
  D.openInNewtabController = new ElementController(e`open-in-new-tab`);

  D.resultController = new ResultController(e`result`);
  setupResultController();
  D.stateManager = new StateManager(new FirestoreStateRepository());
  D.versionController = new SelectController(e`version`);
  D.dialectController = new SelectController(e`dialect`);
  D.switchThemeController = new ElementController(e`switch-theme`);
  D.viewController = new ElementController(e`view`);
  D.formatter = new Formatter();
  D.settingsController = new ElementController(e`settings`);
  D.settingPopupController = new settingPopupController(e`settings-popup`);
  D.mobileModeController = new ElementController(e`mobile-mode`);
  D.loadingOverayController = new ElementController(e`loading-overlay`);

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
      updateEditorOptions();
    })(),
    (async () => {
      D.hightlighter = await Hightlighter.init();
    })(),
  ]);
  initKyselyModule();
  initExecuter();
  if (DEBUG) {
    e`debug-indicator`.removeAttribute("hidden");
  }
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
  setupSettingsController();
  setupMobileModeController();
  setLoading(false);
  setupOpenInNewTabController();
}

function setLoading(v: boolean) {
  D.loadingOverayController.setOpacity(v ? "1" : "0");
}

let loadingCounter = 0;
async function useLoading(cb: () => unknown) {
  setLoading(true);
  loadingCounter += 1;
  try {
    await cb();
  } finally {
    loadingCounter -= 1;
    if (loadingCounter === 0) {
      setLoading(false);
    }
  }
}

function setupOpenInNewTabController() {
  if (!DomUtils.inIframe()) {
    D.openInNewtabController.remove();
    return;
  }

  D.openInNewtabController.onClick(() => {
    window.open(window.location.toString(), "_blank");
  });
}

function setupMobileModeController() {
  if (CssUtils.isWideScreen()) {
    D.mobileModeController.remove();
    return;
  }
  let mobileMode = false;
  const toggle = () => {
    mobileMode = !mobileMode;
    const msg = mobileMode ? "enabled" : "disabled";
    ToastUtils.show("info", `MobileMode ${msg}`);
    D.mobileModeController.setOpacity(mobileMode ? "0.5" : "1");
    D.typeEditorController.setReadonly(mobileMode);
    D.queryEditorController.setReadonly(mobileMode);
  };
  D.mobileModeController.onClick(toggle);
  toggle();
  ToastUtils.show("info", `Editor is read-only.\nCheckout the mobile-icon.`);
}

function setupSettingsController() {
  D.settingsController.onClick(() => {
    D.settingPopupController.toggle();
  });

  function append(name: string, settingsKey: (typeof SETTING_KEYS)[number], cb?: () => unknown) {
    D.settingPopupController.appendBooleanInput(name, SettingsUtils.get(settingsKey), (v) => {
      SettingsUtils.set(settingsKey, v);
      if (cb) {
        cb();
      }
    });
  }

  D.settingPopupController.appendText("Ctrl-S            Save");
  D.settingPopupController.appendText("Ctrl-Shift-S      Save and shorten link");
  D.settingPopupController.appendText("Ctrl-1            Foucs on type-editor");
  D.settingPopupController.appendText("Ctrl-2            Foucs on query-editor");

  D.settingPopupController.appendHeading("typescript-format");
  append("semi", "ts-format:semi", formatEditors);
  append("single-quote", "ts-format:single-quote", formatEditors);
  append("wider-width", "ts-format:wider-width", formatEditors);

  D.settingPopupController.appendHeading("sql-format");
  append("inline-parameters", "sql-format:inline-parameters", executeQuery);
  append("upper-keywords", "sql-format:upper-keywords", executeQuery);

  D.settingPopupController.appendHeading("save");
  append("format-before-save", "save:format-before-save");
  append("copy-url-after-save", "save:copy-url-after-save");
  append("save-view-state", "save:save-view-state");
  D.settingPopupController.appendHeading("editor");
  append("indent-guide", "editor:indent-guide", updateEditorOptions);
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
  D.typeEditorController = await EditorController.init(D.panel0.element, {
    language: "typescript",
    filePath: "node_modules/type-editor/index.ts",
  });
}

async function initQueryEditorController() {
  D.queryEditorController = await EditorController.init(D.panel1.element, {
    language: "typescript",
    filePath: "query-editor.ts",
  });
}

function updateEditorOptions() {
  const indentGuide = SettingsUtils.get("editor:indent-guide");
  D.typeEditorController.setIndentGuide(indentGuide);
  D.queryEditorController.setIndentGuide(indentGuide);
}

function setupResultController() {
  function handleUnexpectedError(e: any) {
    if (e.message && e.message.trim().startsWith("ResizeObserver")) {
      return;
    }
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
    D.panel0.setHidden(true);
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
    D.panel0.setHidden(!D.panel0.isHidden());
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
            const inlineParameters = SettingsUtils.get("sql-format:inline-parameters");
            const upperKeywords = SettingsUtils.get("sql-format:upper-keywords");
            sql = await D.formatter.formatSql(sql, output.parameters, { inlineParameters, upperKeywords });
          } catch (e) {
            logger.error(e);
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

function executeQuery() {
  D.queryEditorController.invokeOnChange();
}

export async function bootstrap() {
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
  await useLoading(async () => {
    if (SettingsUtils.get("save:format-before-save")) {
      await formatEditors();
    }
    await D.stateManager.save(makeState(), shorten);
    if (SettingsUtils.get("save:copy-url-after-save")) {
      await ClipboardUtils.writeText(window.location.toString());
      ToastUtils.show("info", "URL copied");
    }
  });
}

async function formatEditors() {
  await useLoading(async () => {
    try {
      const printWidth = SettingsUtils.get("ts-format:wider-width") ? 100 : 70;
      const semi = SettingsUtils.get("ts-format:semi");
      const singleQuote = SettingsUtils.get("ts-format:single-quote");
      const typeEditorValue = await D.formatter.formatTs(D.typeEditorController.getValue(), {
        printWidth,
        semi,
        singleQuote,
      });
      const queryEditorValue = await D.formatter.formatTs(D.queryEditorController.getValue(), {
        printWidth,
        semi,
        singleQuote,
      });
      D.typeEditorController.setValue(typeEditorValue);
      D.queryEditorController.setValue(queryEditorValue);
    } catch (e) {
      logger.error("Failed to format typescript\n", e);
      ToastUtils.show("error", "Failed to format typescript");
    }
  });
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
    hideType: SettingsUtils.get("save:save-view-state") && D.panel0.isHidden() ? true : undefined,
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
    ToastUtils.show("error", `${D.state.kysely.type}:${D.state.kysely.name} not found.`);
  }
  D.kyselyModule = D.kyselyManager.getLatestTagModule();
}

async function copyText(v: string, msg: string) {
  try {
    await ClipboardUtils.writeText(v);
    ToastUtils.show("info", msg);
  } catch (e: any) {
    ToastUtils.show("error", e.message ?? e.toString());
  }
}
