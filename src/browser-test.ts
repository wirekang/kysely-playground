import { dynamicImport } from "./lib/dynamic-import";
import { KyselyManager } from "./lib/kysely/kysely-manager";
import { logger } from "./lib/log/logger";
import { TypescriptManager } from "./lib/typescript/typescript-manager";
import { HotkeyUtils } from "./lib/utility/hotkey-utils";

async function testKyselyModules() {
  const km = await KyselyManager.init();
  for (let i = 0; i < 3; i += 1) {
    const module = km.modules[i];
    logger.debug(module.label, module);
    await module.loadFiles();
  }
}

async function testTranspile() {
  const tm = await TypescriptManager.init();
  for (let i = 0; i < 3; i += 1) {
    const module = tm.modules[i];
    const js = await module.transpile(`
    import {jsonArrayFrom} from "https://cdn.jsdelivr.net/gh/wirekang/minified-kysely/dist/branch/master/helpers/mysql.js";
    import type { DB } from "./type-editor.d.ts";
    const a = await 3;
    export {
      jsonArrayFrom,
      a,
    }
    `);
    const encodedJs = encodeURIComponent(js);
    const dataUri = `data:text/javascript;charset=utf-8,${encodedJs}`;
    const eee = await dynamicImport(dataUri);
    logger.debug(eee);
    logger.debug(eee.a);
    logger.debug(eee.jsonArrayFrom("asdf"));
  }
}

function testeHotKeyUtils() {
  HotkeyUtils.register("s", { ctrl: true }, () => {
    logger.info("ctrl-s");
  });
  HotkeyUtils.register("s", { ctrl: true, shift: true }, () => {
    logger.info("ctrl-shift-s");
  });
}

// testTranspile()
// testeHotKeyUtils()

// testTranspile();
testKyselyModules();

type Entrypoint = {
  alias: string;
  js: string;
};

const typeDefs: Array<string> = [
  "https://cdn.../index.d.ts",
  "https://cdn.../kysely-bundleidasdfasdf.d.ts",
  "https://cdn.../helpers/mysql.d.ts",
];

const entrypoints: Array<Entrypoint> = [
  {
    alias: "kysely",
    js: "https://cdn.../index.js",
  },
  {
    alias: "kysely/helpers/mysql",
    js: "https://cdn.../helpers/mysql.js",
  },
];
