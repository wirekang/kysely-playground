import styles from "src/components/header/header.module.css"
import { SqlDialect } from "src/lib/sql/types/SqlDialect"
import { useRecoilState } from "recoil"
import { dialectState } from "src/atoms/dialectState"

export function DialectSelect(): JSX.Element {
  const [dialect, setDialect] = useRecoilState(dialectState)
  return (
    <select
      className={styles.dialects}
      value={dialect}
      onChange={(e) => {
        setDialect(e.target.value as any)
      }}
    >
      {Object.keys(SqlDialect).map((key) => (
        // @ts-ignore
        <option key={SqlDialect[key]}>{SqlDialect[key]}</option>
      ))}
    </select>
  )
}
