import { useMediaQuery } from "react-responsive"

export function useIsCompact() {
  return useMediaQuery({ query: "(max-width: 600px)" })
}
