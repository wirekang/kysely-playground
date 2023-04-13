import { useMonaco } from "src/lib/editor/contexts/MonacoContext"
import { useEffect } from "react"
import { useRecoilValue } from "recoil"
import { typescriptGlobalTypesState } from "src/lib/typescript/atoms/typescriptGlobalTypesState"

export function useSetTypescriptGlobalTypes() {
  const typescriptGlobalTypes = useRecoilValue(typescriptGlobalTypesState)
  const monaco = useMonaco()

  useEffect(() => {
    if (!monaco) {
      return
    }

    monaco.languages.typescript.typescriptDefaults.setExtraLibs([
      ...Object.entries(typescriptGlobalTypes).map(([filePath, content]) => ({
        filePath,
        content,
      })),
    ])
  }, [typescriptGlobalTypes, monaco])
}
