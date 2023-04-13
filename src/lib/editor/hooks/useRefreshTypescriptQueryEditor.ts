import { useRecoilValue } from "recoil"
import { typescriptSchemaState } from "src/lib/typescript/atoms/typescriptSchemaState"
import { typescriptQueryEditorEventsState } from "src/lib/editor/atoms/typescriptQueryEditorEventsState"
import { useEffect } from "react"

export function useRefreshTypescriptQueryEditor() {
  const typescriptSchema = useRecoilValue(typescriptSchemaState)
  const typescriptQueryEditorEvents = useRecoilValue(typescriptQueryEditorEventsState)
  useEffect(() => {
    if (!typescriptQueryEditorEvents) {
      return
    }
    typescriptQueryEditorEvents.refresh()
  }, [typescriptSchema, typescriptQueryEditorEvents])
}
