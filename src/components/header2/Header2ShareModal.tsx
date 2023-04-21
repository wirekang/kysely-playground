import { useEffect, useRef, useState } from "react"
import { ShareKind } from "src/lib/share/types/ShareKind"
import { useRecoilState, useRecoilValue } from "recoil"
import { loadingState } from "src/lib/loading/atoms/loadingState"
import { header2ModalState } from "src/lib/ui/atoms/header2ModalState"
import { useShare } from "src/lib/share/hooks/useShare"
import { ShareConstants } from "src/lib/share/ShareConstants"
import { ShareUtils } from "src/lib/share/ShareUtils"
import { EnumUtils } from "src/lib/EnumUtils"
import { Header2Button } from "src/components/header2/Header2Button"

export function Header2ShareModal(): JSX.Element {
  const [loading, setLoading] = useRecoilState(loadingState)
  const header2Modal = useRecoilValue(header2ModalState)

  const [shareKind, setShareKind] = useState(ShareKind.Markdown)
  const [url, setUrl] = useState("")
  const urlRef = useRef<HTMLInputElement>(null)

  const share = useShare()

  const selectAll = () => {
    const input = urlRef.current
    if (!input) {
      return
    }
    input.focus()
    input.select()
    input.scrollTo({ left: 0, top: 0 })
  }

  useEffect(() => {
    if (header2Modal !== "share") {
      return
    }

    const providerId = ShareConstants.SHARE_KIND_PROVIDER_ID[shareKind]
    setLoading((v) => ({ ...v, shareCopy: true }))
    setUrl("")
    share(providerId).then((v) => {
      const url = ShareUtils.generateFormattedUrl(shareKind, v)
      setUrl(url)
      return navigator?.clipboard
        ?.writeText(url)
        .then(() => {
          selectAll()
          setLoading((v) => ({ ...v, shareCopy: false }))
        })
        .catch((e: any) => {
          setLoading((v) => ({ ...v, shareCopy: e.toString() }))
        })
    })
  }, [header2Modal, shareKind, setUrl])

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          border: "1px solid #666",
          padding: "0 12px",
        }}
      >
        {EnumUtils.values(ShareKind).map((kind) => (
          <Header2Button
            key={kind}
            style={{
              fontWeight: "bold",
              margin: "4px 0",
            }}
            onClick={() => {
              setShareKind(kind)
            }}
            disabled={shareKind === kind || loading.shareCopy === true}
          >
            {"● "}
            {ShareConstants.SHARE_KIND_TEXT[kind]}
          </Header2Button>
        ))}
      </div>
      <input
        ref={urlRef}
        style={{
          width: "100%",
          border: "1px solid #777",
          fontSize: "10px",
          marginTop: 4,
          marginBottom: 4,
          cursor: "pointer",
        }}
        type="text"
        readOnly
        value={url}
        onClick={selectAll}
      />
      {loading.shareCopy === true && <div>loading...</div>}
      {loading.shareCopy === false && <div>copied!</div>}
    </div>
  )
}
