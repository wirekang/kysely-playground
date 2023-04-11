import { CSSProperties, ReactNode, useMemo } from "react"
import { useIsCompact } from "src/lib/ui/hooks/useIsCompact"

interface Props {
  style?: CSSProperties
  children: ReactNode
}

export function HeaderGroupContainer(props: Props): JSX.Element {
  const compact = useIsCompact()

  const style = useMemo(() => {
    if (compact) {
      return {
        display: "flex",
      } as CSSProperties
    }
    return {
      display: "inline-flex",
      marginLeft: 4,
      paddingLeft: 8,
      paddingRight: 8,
      borderLeft: "2px solid #777",
    } as CSSProperties
  }, [compact])

  return (
    <div
      style={{
        ...props.style,
        ...style,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      {props.children}
    </div>
  )
}
