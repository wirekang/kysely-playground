import { createContext, ReactNode, useEffect, useState } from "react"
import { MonacoLoader } from "src/lib/editor/MonacoLoader"
import { DebugUtils } from "src/lib/DebugUtils"
import { EnvConstants } from "src/lib/env/EnvConstants"

const MonacoContext = createContext(null)

interface Props {
  fallback: ReactNode
  children: ReactNode
}

export function MonacoProvider({ children, fallback }: Props): JSX.Element {
  const [ok, setOk] = useState(false)

  useEffect(() => {
    MonacoLoader.load()
      .then(async () => {
        if (EnvConstants.PROD) {
          return
        }
        return DebugUtils.sleep(222)
      })
      .then(() => {
        setOk(true)
      })
  }, [])

  if (!ok) {
    return <>{fallback}</>
  }
  return <MonacoContext.Provider value={null}>{children}</MonacoContext.Provider>
}
