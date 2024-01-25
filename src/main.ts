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

function e(id: TemplateStringsArray): any {
  const r = document.getElementById(id[0]);
  if (!r) {
    throw Error(`no element: ${id}`);
  }
  return r;
}

async function bootstrap() {
  const stateManager = new StateManager(new FirestoreStateRepository());
  const state = await stateManager.load();
  logger.debug("loaded state:", state);

  const panel0: HTMLDivElement = e`panel-0`;
  const panel1: HTMLDivElement = e`panel-1`;
  const panel2: HTMLDivElement = e`panel-2`;

  if (state.hideType) {
    panel0.setAttribute("hidden", "");
  }

  const kyselyManager = await KyselyManager.init();

  const toastController = new ToastController(e`toast`);
  const kyselyModule = getKyselyModule(state, kyselyManager, toastController);

  const versionController = new SelectController(e`version`);
  versionController.setOptions(kyselyManager.getModuleIds());
  versionController.setValue(kyselyModule.id);
  versionController.onChange((id) => {
    const newModule = kyselyManager.getModule(id)!;
    patchState({
      kysely: {
        type: newModule.type,
        name: newModule.name,
      },
    });
  });

  const dialectController = new SelectController(e`dialect`);
  dialectController.setOptions([...kyselyModule.dialects]);
  dialectController.setValue(state.dialect);
  dialectController.onChange((dialect: any) => {
    patchState({ dialect });
  });

  new ButtonController(e`switch-theme`).onClick(CssUtils.toggleTheme.bind(null, true));
  new ButtonController(e`view`).onClick(() => {
    if (panel0.hasAttribute("hidden")) {
      panel0.removeAttribute("hidden");
    } else {
      panel0.setAttribute("hidden", "");
    }
  });

  const typeEditorController = await EditorController.init(panel0, {
    language: "typescript",
  });
  typeEditorController.setValue(state.editors.type);

  const queryEditorController = await EditorController.init(panel1, {
    language: "typescript",
  });
  queryEditorController.setValue(state.editors.query);
  queryEditorController.onChange((v) => {
    logger.debug(v);
  });
  const resultController = new ResultController(e`result`);

  HotkeyUtils.register(["ctrl"], "s", async () => {
    await stateManager.save(makeState(), false);
  });
  HotkeyUtils.register(["ctrl", "shift"], "s", async () => {
    await stateManager.save(makeState(), true);
  });
  HotkeyUtils.register(["ctrl"], "1", () => {
    typeEditorController.focus();
  });
  HotkeyUtils.register(["ctrl"], "2", () => {
    queryEditorController.focus();
  });

  function makeState(): State {
    const s: State = {
      editors: {
        type: typeEditorController.getValue(),
        query: queryEditorController.getValue(),
      },
      dialect: state.dialect,
      kysely: {
        type: kyselyModule.type,
        name: kyselyModule.name,
      },
      hideType: panel0.hasAttribute("hidden") ? true : undefined,
    };
    logger.debug("newState", s);
    return s;
  }

  async function reloadState(s: State) {
    await stateManager.save(s, false);
    window.location.reload();
  }

  async function patchState(p: Partial<State>) {
    await reloadState({ ...makeState(), ...p });
  }
}

function getKyselyModule(s: State, km: KyselyManager, tc: ToastController) {
  if (s.kysely) {
    const m = km.findModule(s.kysely.type, s.kysely.name);
    if (m) {
      return m;
    }
    tc.show(`${s.kysely.type}:${s.kysely.name} not found.`);
  }
  return km.getLatestTagModule();
}

logger.info("kysely-playground");
logger.debug("env:", import.meta.env);
CssUtils.initTheme();
bootstrap();
