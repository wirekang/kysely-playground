import kysely from "src/assets/kysely.svg"
import { ImageAnchor } from "src/components/header/ImageAnchor"

export function KyselyLink(): JSX.Element {
  return <ImageAnchor href="https://kysely.dev/docs/category/examples" src={kysely} />
}
