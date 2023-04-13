import { useIsCompact } from "src/lib/ui/hooks/useIsCompact"
import { HeaderToggleButton } from "src/components/header/HeaderToggleButton"
import { GithubLink } from "src/components/header/GithubLink"
import { KyselyLink } from "src/components/header/KyselyLink"

export function HeaderHeader(): JSX.Element {
  const compact = useIsCompact()

  if (compact) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#303030",
          alignItems: "center",
          justifyContent: "stretch",
          padding: 4,
          height: 35,
        }}
      >
        <div style={{ flex: 1 }}>
          <HeaderToggleButton />
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <KyselyLink />
          <GithubLink />
        </div>
        <div style={{ flex: 1 }} />
      </div>
    )
  }

  return <div></div>
}
