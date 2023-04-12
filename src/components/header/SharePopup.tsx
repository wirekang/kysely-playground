import { useRecoilState, useRecoilValue } from "recoil"
import { showSharePopupState } from "src/lib/ui/atoms/showSharePopupState"
import { loadingState } from "src/lib/loading/atoms/loadingState"
import { useContext, useEffect, useRef, useState } from "react"
import { StoreProviderId } from "src/lib/store/types/StoreProviderId"
import { shareableStateState } from "src/lib/state/atoms/shareableStateState"
import { StoreManagerContext } from "src/lib/store/context/StoreManagerContext"
import { ShareUtils } from "src/lib/share/ShareUtils"
import { LogUtils } from "src/lib/log/LogUtils"
import { HeaderButton } from "src/components/header/HeaderButton"
import { ShareKind } from "src/lib/share/types/ShareKind"
import { ShareConstants } from "src/lib/share/ShareConstants"
import { EnumUtils } from "src/lib/EnumUtils"

// TODO: refactor
export function SharePopup(): JSX.Element {
  const [shareKind, setShareKind] = useState(ShareKind.Markdown)
  const shareableState = useRecoilValue(shareableStateState)
  const [show, setShow] = useRecoilState(showSharePopupState)
  const [loading, setLoading] = useRecoilState(loadingState)
  const storeManager = useContext(StoreManagerContext)
  const [url, setUrl] = useState("")
  const urlRef = useRef<HTMLInputElement>(null)
  const handleClose = () => {
    setShow(false)
  }

  const save = (shareKind: ShareKind) => {
    LogUtils.info("Share", shareableState)
    let storeProviderId =
      shareKind === ShareKind.Short ? StoreProviderId.MsgPackFirestore : StoreProviderId.MsgPackBase64

    setLoading((v) => ({ ...v, share: true }))
    storeManager
      .save(storeProviderId, shareableState)
      .then((value) => {
        let url = ShareUtils.generateUrl({ value, storeProviderId })
        if (shareKind === ShareKind.Markdown) {
          url = `[Playground Link](${url})`
        }
        setUrl(url)
        return navigator?.clipboard?.writeText(url)
      })
      .then(() => {
        const urlInput = urlRef.current
        if (urlInput === null) {
          return
        }
        urlInput.focus()
        urlInput.select()
        urlInput.scrollTo({ left: 0, top: 0 })
      })
      .finally(() => {
        setLoading((v) => ({ ...v, share: false }))
      })
  }

  useEffect(() => {
    if (!show) {
      return
    }
    save(shareKind)
  }, [show, shareKind])

  if (!show) {
    return <></>
  }

  return (
    <>
      <div
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          backgroundColor: "black",
          opacity: 0.4,
          zIndex: 100,
        }}
        onClick={handleClose}
      />
      <div
        style={{
          position: "absolute",
          zIndex: 100,
          width: "80%",
          maxWidth: 500,
          top: 8,
          left: 8,
          height: 100,
          backgroundColor: "#333",
          borderRadius: 8,
          border: "1px solid #777",
          padding: 8,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          {EnumUtils.values(ShareKind).map((kind) => (
            <HeaderButton
              key={kind}
              onClick={() => {
                setShareKind(kind)
              }}
              disabled={shareKind === kind}
            >
              {ShareConstants.SHARE_KIND_TEXT[kind]}
            </HeaderButton>
          ))}
        </div>
        <input
          ref={urlRef}
          style={{ width: "100%", border: "1px solid #777", fontSize: "10px" }}
          type="text"
          readOnly
          value={url}
        />
        {loading.share && <div>loading...</div>}
        {!loading.share && <div>copied!</div>}
      </div>
    </>
  )
}
