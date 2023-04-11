import { GithubLink } from "src/components/header/GithubLink"
import { useIsCompact } from "src/lib/ui/hooks/useIsCompact"

export function GithubLinkWrapper(): JSX.Element {
  const compact = useIsCompact()
  if (compact) {
    return <></>
  }

  return (
    <div
      style={{
        marginLeft: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 20,
      }}
    >
      <GithubLink />
    </div>
  )
}
