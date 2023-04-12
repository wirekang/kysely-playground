import { useRecoilValue } from "recoil"
import { kyselyTypeState } from "src/lib/kysely/atoms/kyselyTypeState"
import { useMonaco } from "src/lib/editor/contexts/MonacoContext"
import { useEffect } from "react"
import { EditorConstants } from "src/lib/editor/EditorConstants"
import { TypescriptConstants } from "src/lib/typescript/TypescriptConstants"

export function useSetTypescriptTypes() {
  const kyselyType = useRecoilValue(kyselyTypeState)
  const monaco = useMonaco()

  useEffect(() => {
    if (!monaco) {
      return
    }

    monaco.languages.typescript.typescriptDefaults.setExtraLibs([
      {
        filePath: EditorConstants.KYSELY_TYPE_PATH,
        content: kyselyType,
      },
      {
        filePath: EditorConstants.GLOBAL_TYPE_PATH,
        content: TypescriptConstants.GLOBAL_TYPE_CONTENT,
      },
    ])
  }, [kyselyType, monaco])
}
