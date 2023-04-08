import module from "./App.module.css"
import { MonacoProvider } from "src/lib/editor/contexts/MonacoContext"
import { Header } from "src/components/header/Header"
import { TypescriptEditor } from "src/components/editor/TypescriptEditor"
import { SqlEditor } from "src/components/editor/SqlEditor"

function App() {
  return (
    <div className={module.app}>
      <MonacoProvider fallback={<div>LOADING...</div>}>
        <Header />
        <TypescriptEditor />
        <SqlEditor />
      </MonacoProvider>
    </div>
  )
}

export default App
