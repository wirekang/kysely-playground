import { useMonaco } from "src/lib/editor/contexts/MonacoContext"
import { useEffect } from "react"

export function useSetTypescriptCompilerOptions() {
  const monaco = useMonaco()

  useEffect(() => {
    if (!monaco) {
      return
    }
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      module: monaco.languages.typescript.ModuleKind.ESNext,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      target: monaco.languages.typescript.ScriptTarget.ESNext,
      strict: true,
      noImplicitAny: true,
      strictNullChecks: true,
    })
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      diagnosticCodesToIgnore: [1375],
    })
  }, [monaco])
}
