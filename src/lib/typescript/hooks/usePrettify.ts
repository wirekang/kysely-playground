import { useRecoilState, useRecoilValue } from "recoil"
import { typescriptFormatOptionsState } from "src/lib/typescript/atoms/typescriptFormatOptionsState"
import { typescriptSchemaEditorEventsState } from "src/lib/editor/atoms/typescriptSchemaEditorEventsState"
import { typescriptSchemaState } from "src/lib/typescript/atoms/typescriptSchemaState"
import { typescriptQueryState } from "src/lib/typescript/atoms/typescriptQueryState"
import { typescriptQueryEditorEventsState } from "src/lib/editor/atoms/typescriptQueryEditorEventsState"
import { loadingState } from "src/lib/loading/atoms/loadingState"
import { TypescriptFormatUtils } from "src/lib/typescript/TypescriptFormatUtils"
import { useCallback } from "react"

export function usePrettify() {
  const typescriptFormatOptions = useRecoilValue(typescriptFormatOptionsState)
  const typescriptSchemaEditorEvents = useRecoilValue(typescriptSchemaEditorEventsState)
  const typescriptSchema = useRecoilValue(typescriptSchemaState)
  const typescriptQuery = useRecoilValue(typescriptQueryState)
  const typescriptQueryEditorEvents = useRecoilValue(typescriptQueryEditorEventsState)
  const [, setLoading] = useRecoilState(loadingState)

  const handleClick = useCallback(async () => {
    if (!typescriptSchemaEditorEvents || !typescriptQueryEditorEvents) {
      return
    }

    setLoading((v) => ({ ...v, prettier: true }))
    const handleError = (e: any) => {
      setLoading((v) => ({ ...v, prettier: e.toString() }))
    }
    return TypescriptFormatUtils.format(typescriptQuery, typescriptFormatOptions)
      .then((ts) => {
        typescriptQueryEditorEvents.setValue(ts)
        return TypescriptFormatUtils.format(typescriptSchema, typescriptFormatOptions)
      })
      .then((ts) => {
        typescriptSchemaEditorEvents.setValue(ts)
        setLoading((v) => ({ ...v, prettier: false }))
      })
      .catch(handleError)
  }, [
    typescriptFormatOptions,
    typescriptSchemaEditorEvents,
    typescriptSchema,
    typescriptQuery,
    typescriptQueryEditorEvents,
    setLoading,
  ])

  return handleClick
}
