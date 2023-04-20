import { HeaderButton } from "src/components/header/HeaderButton"
import { useRecoilValue } from "recoil"
import { loadingState } from "src/lib/loading/atoms/loadingState"
import { typescriptSchemaEditorEventsState } from "src/lib/editor/atoms/typescriptSchemaEditorEventsState"
import { typescriptQueryEditorEventsState } from "src/lib/editor/atoms/typescriptQueryEditorEventsState"
import { usePrettify } from "src/lib/typescript/hooks/usePrettify"

export function PrettifyButton(): JSX.Element {
  const typescriptSchemaEditorEvents = useRecoilValue(typescriptSchemaEditorEventsState)
  const typescriptQueryEditorEvents = useRecoilValue(typescriptQueryEditorEventsState)
  const loading = useRecoilValue(loadingState)

  const handleClick = usePrettify()

  return (
    <HeaderButton
      onClick={handleClick}
      disabled={loading.prettier === true || !typescriptSchemaEditorEvents || !typescriptQueryEditorEvents}
    >
      Prettify
    </HeaderButton>
  )
}
