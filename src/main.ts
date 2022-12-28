import "./style.css";
import { setup as setupWorker } from "./monaco/setup-worker";
import { events, setErrorText, setSqlText } from "./ui/ui";
import { getValue, setup as setupEditor } from "./monaco/setup-editor";
import { getCopytypeTypes } from "./copytype/copytype";
import { KYSELY_GLOBAL_TYPE } from "./copytype/constants";
import { format } from "./sql/format";
import { compile } from "./sql/compile";
import { config } from "./config/config";

setupWorker();
const onChange = (v: string) => {
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
    onChange,
  });
  events.onChangeDialect = (v) => {
    config.dialect = v;
    onChange(getValue());
  };
})();
