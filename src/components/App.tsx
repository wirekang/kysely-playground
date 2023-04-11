import { MonacoProvider } from "src/lib/editor/contexts/MonacoContext"
import { Header } from "src/components/header/Header"
import { EditorContainer } from "src/components/editor/EditorContainer"

function App() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "flex-start",
      }}
    >
      <Header />
      <MonacoProvider>
        <EditorContainer />
      </MonacoProvider>
    </div>
  )
}

export default App
