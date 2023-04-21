import kysely from "src/assets/kysely.svg"
import { Header2ImageAnchor } from "src/components/header2/Header2ImageAnchor"

export function Header2KyselyLink(): JSX.Element {
  return <Header2ImageAnchor href="https://kysely.dev/docs/category/examples" src={kysely} />
}
