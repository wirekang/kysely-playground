import "./style.css";
import { setup as setupWorker } from "./monaco/setup-worker";
import { events, setSqlHtml } from "./ui/ui";
import { getValue, setup as setupEditor } from "./monaco/setup-editor";
import { getCopytypeTypes } from "./copytype/copytype";
import { KYSELY_GLOBAL_TYPE } from "./copytype/constants";
import { format } from "./sql/format";
import { compile } from "./sql/compile";
import { config } from "./config/config";
import "prismjs";
import "prismjs/components/prism-sql";
import "prismjs/themes/prism.css";
import { highlight, languages } from "prismjs";

setupWorker();
const onChange = (v: string) => {
  const sql = format(compile(v, { dialect: config.dialect }), {
    language: config.dialect,
    keywordCase: config.formatOptions.keywordCase,
  });

  setSqlHtml(highlight(sql, languages["sql"], "sql"));
};
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
