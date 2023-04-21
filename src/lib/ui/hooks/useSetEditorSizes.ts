import { useMountEffect } from "@react-hookz/web"
import { sqlEditorSizeState } from "src/lib/ui/atoms/sqlEditorSizeState"
import { useRecoilState } from "recoil"
import { typescriptSchemaEditorSizeState } from "src/lib/ui/atoms/typescriptSchemaEditorSizeState"

export function useSetEditorSizes() {
  const [, setSqlEditorSize] = useRecoilState(sqlEditorSizeState)
  const [, setTypescriptSchemaEditorSize] = useRecoilState(typescriptSchemaEditorSizeState)
  useMountEffect(() => {
    const size = Math.floor(window.document.body.clientWidth / 3)
    setSqlEditorSize(size)
    setTypescriptSchemaEditorSize(size)
  })
}
