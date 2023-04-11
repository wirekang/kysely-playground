import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { EditorUtils } from "src/lib/editor/EditorUtils"
import type * as monaco from "monaco-editor"
import { useRecoilState } from "recoil"
import { loadingState } from "src/lib/loading/atoms/loadingState"

const MonacoContext = createContext<typeof monaco>(null as any)

interface Props {
  children: ReactNode
}

export function MonacoProvider(props: Props): JSX.Element {
  const [value, setValue] = useState<typeof monaco | null>(null)
  const [, setLoading] = useRecoilState(loadingState)

  useEffect(() => {
    setLoading((v) => ({ ...v, monaco: true }))
    EditorUtils.loadMonaco().then((r) => {
      setValue(r)
      setLoading((v) => ({ ...v, monaco: false }))
    })
  }, [])

  if (!value) {
    return <></>
  }
  return <MonacoContext.Provider value={value}>{props.children}</MonacoContext.Provider>
}

export function useMonaco() {
  return useContext(MonacoContext)
}
