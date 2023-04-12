import { useContext, useEffect } from "react"
import { ShareUtils } from "src/lib/share/ShareUtils"
import { LogUtils } from "src/lib/log/LogUtils"
import { StoreManagerContext } from "src/lib/store/context/StoreManagerContext"
import { useRecoilState } from "recoil"
import { loadingState } from "src/lib/loading/atoms/loadingState"
import { shareableStateState } from "src/lib/state/atoms/shareableStateState"
import { EditorUtils } from "src/lib/editor/EditorUtils"

export function useInitShare() {
  const storeManager = useContext(StoreManagerContext)
  const [loading, setLoading] = useRecoilState(loadingState)
  const [shareableState, setShareableState] = useRecoilState(shareableStateState)

  useEffect(() => {
    if (loading.typescriptModel) {
      return
    }

    const item = ShareUtils.parseUrl()
    if (item === null) {
      LogUtils.info("no share")
      EditorUtils.dispatchSetTs(shareableState.ts)
      return
    }

    setLoading((v) => ({ ...v, share: true }))
    storeManager
      .load(item.storeProviderId, item.value)
      .then((shareableState) => {
        LogUtils.info("Load", shareableState)
        setShareableState({ ...shareableState })
        EditorUtils.dispatchSetTs(shareableState.ts)
      })
      .finally(() => {
        setLoading((v) => ({ ...v, share: false }))
      })
  }, [loading.typescriptModel])
}
