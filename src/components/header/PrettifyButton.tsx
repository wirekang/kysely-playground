import { HeaderButton } from "src/components/header/HeaderButton"
import { useRecoilState, useRecoilValue } from "recoil"
import { loadingState } from "src/lib/loading/atoms/loadingState"
import { typescriptFormatOptionsState } from "src/lib/typescript/atoms/typescriptFormatOptionsState"
import { typescriptSchemaEditorEventsState } from "src/lib/editor/atoms/typescriptSchemaEditorEventsState"
import { typescriptQueryEditorEventsState } from "src/lib/editor/atoms/typescriptQueryEditorEventsState"
import { typescriptSchemaState } from "src/lib/typescript/atoms/typescriptSchemaState"
import { typescriptQueryState } from "src/lib/typescript/atoms/typescriptQueryState"
import { TypescriptFormatUtils } from "src/lib/typescript/TypescriptFormatUtils"

export function PrettifyButton(): JSX.Element {
  const typescriptFormatOptions = useRecoilValue(typescriptFormatOptionsState)
  const typescriptSchemaEditorEvents = useRecoilValue(typescriptSchemaEditorEventsState)
  const typescriptSchema = useRecoilValue(typescriptSchemaState)
  const typescriptQuery = useRecoilValue(typescriptQueryState)
  const typescriptQueryEditorEvents = useRecoilValue(typescriptQueryEditorEventsState)
  const [loading, setLoading] = useRecoilState(loadingState)

  const handleClick = () => {
    if (!typescriptSchemaEditorEvents || !typescriptQueryEditorEvents) {
      return
    }

    setLoading((v) => ({ ...v, prettier: true }))
    const handleError = (e: any) => {
      setLoading((v) => ({ ...v, prettier: e.toString() }))
    }
    TypescriptFormatUtils.format(typescriptQuery, typescriptFormatOptions)
      .then((ts) => {
        typescriptQueryEditorEvents.setValue(ts)
        return TypescriptFormatUtils.format(typescriptSchema, typescriptFormatOptions)
      })
      .then((ts) => {
        typescriptSchemaEditorEvents.setValue(ts)
        setLoading((v) => ({ ...v, prettier: false }))
      })
      .catch(handleError)
  }

  return (
    <HeaderButton
      onClick={handleClick}
      disabled={loading.prettier === true || !typescriptSchemaEditorEvents || !typescriptQueryEditorEvents}
    >
      Prettify
    </HeaderButton>
  )
}
