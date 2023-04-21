import github from "src/assets/github.svg"
import { Header2ImageAnchor } from "src/components/header2/Header2ImageAnchor"

export function Header2GithubLink(): JSX.Element {
  return <Header2ImageAnchor href="https://github.com/wirekang/kysely-playground" src={github} />
}
