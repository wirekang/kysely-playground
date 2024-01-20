import "src/reset.css"
import "src/index.css"
import React from "react"
import ReactDOM from "react-dom/client"
import { RecoilRoot } from "recoil"
import App from "src/components/App"
import { MonacoProvider } from "src/lib/editor/contexts/MonacoContext"
import { StoreManagerProvider } from "src/lib/store/context/StoreManagerContext"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <MonacoProvider>
        <StoreManagerProvider>
          <App />
        </StoreManagerProvider>
      </MonacoProvider>
    </RecoilRoot>
  </React.StrictMode>
)
console.log("Github Pages")
