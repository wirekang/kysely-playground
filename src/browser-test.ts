import { Executer } from "./lib/executer/executer";
import { logger } from "./lib/utility/logger";
import { HotkeyUtils } from "./lib/utility/hotkey-utils";

function testHotKeyUtils() {
  HotkeyUtils.register(["ctrl"], "s", () => {
    logger.info("ctrl-s");
  });
  HotkeyUtils.register(["ctrl", "shift"], "s", () => {
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
testExecuter();
