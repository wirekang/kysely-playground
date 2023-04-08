import styles from "src/components/header/header.module.css"
import { useState } from "react"
import classNames from "classnames"
import { DialectSelect } from "src/components/header/DialectSelect"
import { VersionSelect } from "src/components/header/VersionSelect"

export function Header(): JSX.Element {
  const [open, setOpen] = useState(false)
  const handleToggle = () => {
    setOpen((v) => !v)
  }

  return (
    <div className={styles.wrapper}>
      <button className={styles.button} onClick={handleToggle}>
        <div>...</div>
      </button>
      <div className={classNames(styles.inner, open && styles.open)}>
        <button className={styles.share}>Share</button>
        <button className={styles.prettify}>Prettify</button>
        <DialectSelect />
        <VersionSelect />
        <label>
          schema
          <input className={styles.schema} type="checkbox" />
        </label>
        <a href="https://github.com/wirekang/kysely-playground" target="_blank" className={styles.github}>
          Github
        </a>
      </div>
    </div>
  )
}
