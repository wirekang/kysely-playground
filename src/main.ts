import "./style.css";
import { setup as setupWorker } from "./monaco/setup-worker";
import { events as uiEvents, setErrorText, setSqlText } from "./ui/ui";
import { getValue, setup as setupEditor, setValue } from "./monaco/setup-editor";
import { getCopytypeTypes } from "./copytype/copytype";
import { KYSELY_GLOBAL_TYPE } from "./copytype/constants";
import { format } from "./sql/format";
import { compile } from "./sql/compile";
import { config } from "./config/config";
import { load, onChangeState } from "./state/state";

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
      onChangeState(config.dialect, ts);
    },
  });
  uiEvents.onChangeDialect = (v) => {
    config.dialect = v;
    const ts = getValue();
    onTsChange(ts);
    onChangeState(v, ts);
  };
  uiEvents.onChangeExample = (v) => {
    onTsChange(v);
    onChangeState(config.dialect, v);
    setValue(v);
  };
  const d = load();
  if (d) {
    config.dialect = d.dialect;
    onTsChange(d.ts);
    setValue(d.ts);
  }
})();
