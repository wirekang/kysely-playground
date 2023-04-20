import { useRecoilState } from "recoil"
import { showSharePopupState } from "src/lib/ui/atoms/showSharePopupState"
import { useEffect, useRef, useState } from "react"
import { HeaderButton } from "src/components/header/HeaderButton"
import { ShareKind } from "src/lib/share/types/ShareKind"
import { ShareConstants } from "src/lib/share/ShareConstants"
import { EnumUtils } from "src/lib/EnumUtils"
import { useShare } from "src/lib/share/hooks/useShare"
import { loadingState } from "src/lib/loading/atoms/loadingState"
import { ShareUtils } from "src/lib/share/ShareUtils"

export function SharePopup(): JSX.Element {
  const [shareKind, setShareKind] = useState(ShareKind.Markdown)
  const [show, setShow] = useRecoilState(showSharePopupState)
  const [loading, setLoading] = useRecoilState(loadingState)
  const urlRef = useRef<HTMLInputElement>(null)
  const [url, setUrl] = useState("")

  const handleClose = () => {
    setShow(false)
  }

  const share = useShare()

  useEffect(() => {
    if (!show) {
      return
    }
    const providerId = ShareConstants.SHARE_KIND_PROVIDER_ID[shareKind]
    setLoading((v) => ({ ...v, shareCopy: true }))
    share(providerId).then((v) => {
      const url = ShareUtils.generateFormattedUrl(shareKind, v)
      setUrl(url)
      return navigator?.clipboard
        ?.writeText(url)
        .then(() => {
          const urlInput = urlRef.current
          if (urlInput === null) {
            return
          }
          urlInput.focus()
          urlInput.select()
          urlInput.scrollTo({ left: 0, top: 0 })
          setLoading((v) => ({ ...v, shareCopy: false }))
        })
        .catch((e: any) => {
          setLoading((v) => ({ ...v, shareCopy: e.toString() }))
        })
    })
  }, [show, shareKind, setUrl])

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
          width: "90%",
          maxWidth: 500,
          top: 8,
          left: 8,
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
              style={{ fontSize: "14px" }}
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
          style={{ width: "100%", border: "1px solid #777", fontSize: "10px", marginTop: 4, marginBottom: 4 }}
          type="text"
          readOnly
          value={url}
        />
        {loading.shareCopy === true && <div>loading...</div>}
        {loading.shareCopy === false && <div>copied!</div>}
      </div>
    </>
  )
}
