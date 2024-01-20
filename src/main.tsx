import "./reset.css"
import "./index.css"
import "./lib/firebase/firebase"

import React from "react"
import ReactDOM from "react-dom/client"
import { logger } from "./lib/log/logger"

logger.info("entrypoint")
logger.debug(JSON.stringify(import.meta.env))
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    asdf
  </React.StrictMode>
)