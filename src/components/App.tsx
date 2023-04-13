import { Header } from "src/components/header/Header"
import { EditorContainer } from "src/components/editor/EditorContainer"
import { Footer } from "src/components/footer/Footer"
import { useSetKyselyGlobalType } from "src/lib/kysely/hooks/useSetKyselyGlobalType"
import { useSetKyselyModule } from "src/lib/kysely/hooks/useSetKyselyModule"
import { useSetSqlResult } from "src/lib/kysely/hooks/useSetSqlResult"
import { useSetTypescriptCompilerOptions } from "src/lib/typescript/hooks/useSetTypescriptCompilerOptions"
import { useSetTypescriptGlobalTypes } from "src/lib/typescript/hooks/useSetTypescriptGlobalTypes"
import { useInitShare } from "src/lib/share/hooks/useInitShare"
import { MonacoWrapper } from "src/components/editor/MonacoWrapper"
import { useRefreshTypescriptQueryEditor } from "src/lib/editor/hooks/useRefreshTypescriptQueryEditor"

function App() {
  useSetTypescriptCompilerOptions()
  useSetTypescriptGlobalTypes()

  useSetKyselyGlobalType()
  useSetKyselyModule()

  useRefreshTypescriptQueryEditor()
  useSetSqlResult()

  useInitShare()

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
      <MonacoWrapper>
        <EditorContainer />
      </MonacoWrapper>
      <Footer />
    </div>
  )
}

export default App
