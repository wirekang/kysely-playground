import { Header2Button } from "src/components/header2/Header2Button"

export function Header2OpenInPreviewButton(): JSX.Element {
  return (
    <Header2Button
      overrideStyle={{
        fontSize: "10px",
      }}
      onClick={() => {
        window.open(`https://kysely-playground.web.app${window.location.search}`, "_blank")
      }}
    >
      Open In Preview
    </Header2Button>
  )
}
