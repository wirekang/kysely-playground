import "./reset.css";
import "./index.css";

import { logger } from "./lib/log/logger";

logger.info("kysely-playground");
logger.debug("env:", import.meta.env);

logger.debug(document);
window.addEventListener("keydown", (e) => {
  logger.debug(e);
});

import esTreePlugin from "prettier/plugins/estree";
import typescriptPlugin from "prettier/plugins/typescript";
import { format } from "prettier/standalone";
format("const a= 'asdf'", { parser: "typescript", plugins: [typescriptPlugin, esTreePlugin] }).then(
  logger.debug,
);
