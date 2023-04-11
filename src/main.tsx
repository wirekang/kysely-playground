import "the-new-css-reset/css/reset.css"
import "src/index.css"
import React from "react"
import ReactDOM from "react-dom/client"
import { RecoilRoot } from "recoil"
import App from "src/components/App"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
)
