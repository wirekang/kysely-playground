import { useRecoilState, useRecoilValue } from "recoil"
import { userTypingState } from "src/lib/ui/atoms/userTypingState"
import { typescriptQueryState } from "src/lib/typescript/atoms/typescriptQueryState"
import { useEffect } from "react"

export function useSetUserTyping() {
  const [, setUserTyping] = useRecoilState(userTypingState)
  const typescriptQuery = useRecoilValue(typescriptQueryState)

  useEffect(() => {
    setUserTyping(true)
    const t = setTimeout(() => {
      setUserTyping(false)
    }, 400)
    return () => {
      clearTimeout(t)
    }
  }, [typescriptQuery])
}
