import { GithubLink } from "src/components/header/GithubLink"
import { useIsCompact } from "src/lib/ui/hooks/useIsCompact"
import { KyselyLink } from "src/components/header/KyselyLink"

export function HeaderRight(): JSX.Element {
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
      <KyselyLink />
      <GithubLink />
    </div>
  )
}
