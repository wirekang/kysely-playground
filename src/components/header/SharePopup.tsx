import { useRecoilState, useRecoilValue } from "recoil"
import { showSharePopupState } from "src/lib/ui/atoms/showSharePopupState"
import { useEffect, useRef, useState } from "react"
import { StoreProviderId } from "src/lib/store/types/StoreProviderId"
import { ShareUtils } from "src/lib/share/ShareUtils"
import { LogUtils } from "src/lib/log/LogUtils"
import { HeaderButton } from "src/components/header/HeaderButton"
import { ShareKind } from "src/lib/share/types/ShareKind"
import { ShareConstants } from "src/lib/share/ShareConstants"
import { EnumUtils } from "src/lib/EnumUtils"
import { useStoreManager } from "src/lib/store/context/StoreManagerContext"
import { sqlDialectState } from "src/lib/sql/atoms/sqlDialectState"
import { typescriptSchemaState } from "src/lib/typescript/atoms/typescriptSchemaState"
import { typescriptQueryState } from "src/lib/typescript/atoms/typescriptQueryState"
import { kyselyVersionState } from "src/lib/kysely/atoms/kyselyVersionState"

export function SharePopup(): JSX.Element {
  const [shareKind, setShareKind] = useState(ShareKind.Markdown)
  const [show, setShow] = useRecoilState(showSharePopupState)
  const storeManager = useStoreManager()
  const [url, setUrl] = useState("")
  const urlRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()
  const sqlDialect = useRecoilValue(sqlDialectState)
  const kyselyVersion = useRecoilValue(kyselyVersionState)
  const typescriptSchema = useRecoilValue(typescriptSchemaState)
  const typescriptQuery = useRecoilValue(typescriptQueryState)

  const handleClose = () => {
    setShow(false)
  }

  const save = (shareKind: ShareKind) => {
    const storeProviderId =
      shareKind === ShareKind.Short ? StoreProviderId.MsgPackFirestore : StoreProviderId.MsgPackBase64

    LogUtils.info("Share", shareKind, storeProviderId)

    setUrl("")
    setLoading(true)
    storeManager
      .save(storeProviderId, {
        d: sqlDialect,
        v: kyselyVersion,
        s: typescriptSchema,
        q: typescriptQuery,
      })
      .then((value) => {
        let url = ShareUtils.generateUrl({ value, storeProviderId })
        if (shareKind === ShareKind.Markdown) {
          url = `[Playground Link](${url})`
        }
        setShareKind(shareKind)
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
      .catch((e: any) => {
        setError(e.toString())
      })
      .finally(() => {
        setLoading(false)
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
        {loading && <div>loading...</div>}
        {!loading && !error && <div>copied!</div>}
        {error && <div>error: {error}</div>}
      </div>
    </>
  )
}
