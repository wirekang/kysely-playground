import { Executer } from "./lib/executer/executer";
import { KyselyManager } from "./lib/kysely/kysely-manager";
import { logger } from "./lib/log/logger";
import { HotkeyUtils } from "./lib/utility/hotkey-utils";

async function testKyselyModules() {
  const km = await KyselyManager.init();
  for (let i = 0; i < 3; i += 1) {
    const module = km.modules[i];
    logger.debug(module.label, module);
  }
}

function testHotKeyUtils() {
  HotkeyUtils.register("s", { ctrl: true }, () => {
    logger.info("ctrl-s");
  });
  HotkeyUtils.register("s", { ctrl: true, shift: true }, () => {
    logger.info("ctrl-shift-s");
  });
}

async function testExecuter() {
  const e = new Executer({
    "is-number": "https://esm.run/is-number@7.0.0",
    "is-odd": "https://esm.run/is-odd@latest",
  });
  await e.execute(`
  import isNumber from "is-number";
  import isOdd from 'is-odd';

  await new Promise(
    (resolve)=>{
      setTimeout(resolve,1000)
    }
  );
  console.log("is 1234 number:",isNumber(1234))
  console.log("is 1234 odd:",isOdd(1234))
  `);
}

testHotKeyUtils();
testKyselyModules();
testExecuter();
