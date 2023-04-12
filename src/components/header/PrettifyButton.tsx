import { HeaderButton } from "src/components/header/HeaderButton"
import { useRecoilState, useRecoilValue } from "recoil"
import { shareableStateState } from "src/lib/state/atoms/shareableStateState"
import { EditorUtils } from "src/lib/editor/EditorUtils"
import { loadingState } from "src/lib/loading/atoms/loadingState"
import { TypescriptUtils } from "src/lib/typescript/TypescriptUtils"
import { typescriptFormatOptionsState } from "src/lib/typescript/atoms/typescriptFormatOptionsState"

export function PrettifyButton(): JSX.Element {
  const shareableState = useRecoilValue(shareableStateState)
  const typescriptFormatOptions = useRecoilValue(typescriptFormatOptionsState)
  const [loading, setLoading] = useRecoilState(loadingState)

  const handleClick = () => {
    ;(async () => {
      setLoading((v) => ({ ...v, prettier: true }))
      const ts = await TypescriptUtils.format(shareableState.ts, typescriptFormatOptions)
      EditorUtils.dispatchSetTs(ts)
      setLoading((v) => ({ ...v, prettier: false }))
    })()
  }

  return (
    <HeaderButton onClick={handleClick} disabled={loading.prettier}>
      Prettify
    </HeaderButton>
  )
}
