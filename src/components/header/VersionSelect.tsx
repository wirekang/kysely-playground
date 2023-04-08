import styles from "./header.module.css"
import { KyselyConstants } from "src/lib/kysely/KyselyConstants"
import { useRecoilState } from "recoil"
import { kyselyVersionState } from "src/atoms/kyselyVersionState"

export function VersionSelect(): JSX.Element {
  const [version, setVersion] = useRecoilState(kyselyVersionState)

  return (
    <select
      className={styles.versions}
      value={version}
      onChange={(e) => {
        setVersion(e.target.value)
      }}
    >
      {KyselyConstants.VERSIONS.map((version) => (
        <option key={version} value={version}>
          {version}
        </option>
      ))}
    </select>
  )
}
