import "./style.css";
import { setup as setupWorker } from "./monaco/setup-worker";
import {
  events as uiEvents,
  onLoadingFinish,
  setErrorText,
  setShareUrlHelperText,
  setShareUrlText,
  setSqlText,
} from "./ui/ui";
import { getValue, setup as setupEditor, setValue } from "./monaco/setup-editor";
import { getCopytypeTypes } from "./copytype/copytype";
import { KYSELY_GLOBAL_TYPE } from "./copytype/constants";
import { format } from "./sql/format";
import { compile } from "./sql/compile";
import { config } from "./config/config";
import { load, makeShareUrl } from "./state/state";

setupWorker();
const onTsChange = (v: string) => {
  try {
    const sql = format(compile(v, { dialect: config.dialect }), {
      dialect: config.dialect,
      keywordCase: config.formatOptions.keywordCase,
    });

    setSqlText(sql, config.dialect);
    setErrorText();
  } catch (e: any) {
    setErrorText(`${e}`);
  }
};

(async () => {
  await setupEditor({
    extraTypes: [
      ...(await getCopytypeTypes()),
      {
        content: KYSELY_GLOBAL_TYPE,
        filePath: "file:///kysely-global.ts",
      },
    ],
    onChange: (ts) => {
      onTsChange(ts);
    },
  });
  uiEvents.onChangeDialect = (v) => {
    config.dialect = v;
    const ts = getValue();
    onTsChange(ts);
  };
  uiEvents.onChangeExample = (v) => {
    onTsChange(v);
    setValue(v);
  };
  uiEvents.onShare = async () => {
    setShareUrlHelperText("Loading...");
    setShareUrlText();
    const state = {
      dialect: config.dialect,
      ts: getValue(),
    };
    try {
      const url = await makeShareUrl(state);
      setShareUrlText(url);
    } catch (e) {
      console.error(e);
      setErrorText(`Failed to make share url.\n      ${e}`);
    }
  };
  try {
    const d = await load();

    if (d) {
      config.dialect = d.dialect;
      onTsChange(d.ts);
      setValue(d.ts);
    }
  } catch (e) {
    console.error(e);
    setErrorText(` Failed to parse url. It seems to be broken.\n       ${e}`);
  }
  onLoadingFinish();
})();
