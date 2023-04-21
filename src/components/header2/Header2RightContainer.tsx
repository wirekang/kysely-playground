import { useIsCompact } from "src/lib/ui/hooks/useIsCompact"

export function Header2RightContainer(props: any): JSX.Element {
  const compact = useIsCompact()
  return (
    <div
      style={{
        marginLeft: "auto",
        marginRight: compact ? "auto" : 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: compact ? "97%" : undefined,
      }}
    >
      {props.children}
    </div>
  )
}
