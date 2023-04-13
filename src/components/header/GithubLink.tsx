import github from "src/assets/github.svg"
import { ImageAnchor } from "src/components/header/ImageAnchor"

export function GithubLink(): JSX.Element {
  return <ImageAnchor href="https://github.com/wirekang/kysely-playground" src={github} />
}
