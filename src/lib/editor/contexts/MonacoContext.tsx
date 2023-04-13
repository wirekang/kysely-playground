import { createContext, ReactNode, useContext, useState } from "react"
import { EditorUtils } from "src/lib/editor/EditorUtils"
import type * as monaco from "monaco-editor"
import { useLoadingScopeEffect } from "src/lib/loading/hooks/useLoadingScopeEffect"

const MonacoContext = createContext<typeof monaco | null>(null)

interface Props {
  children: ReactNode
}

export function MonacoProvider(props: Props): JSX.Element {
  const [value, setValue] = useState<typeof monaco | null>(null)

  useLoadingScopeEffect(
    "monaco",
    async () => {
      const monaco = await EditorUtils.loadMonaco()
      setValue(monaco)
    },
    [setValue]
  )

  return <MonacoContext.Provider value={value}>{props.children}</MonacoContext.Provider>
}

export function useMonaco() {
  return useContext(MonacoContext)
}
