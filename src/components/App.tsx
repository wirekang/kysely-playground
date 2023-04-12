import { MonacoProvider } from "src/lib/editor/contexts/MonacoContext"
import { Header } from "src/components/header/Header"
import { EditorContainer } from "src/components/editor/EditorContainer"
import { Footer } from "src/components/footer/Footer"
import { StoreManagerProvider } from "src/lib/store/context/StoreManagerContext"

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
        <StoreManagerProvider>
          <EditorContainer />
        </StoreManagerProvider>
      </MonacoProvider>
      <Footer />
    </div>
  )
}

export default App
