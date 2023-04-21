import { Header2Container } from "src/components/header2/Header2Container"
import { Header2KyselyVersionSelect } from "src/components/header2/Header2KyselyVersionSelect"
import { Header2SqlDialectSelect } from "src/components/header2/Header2SqlDialectSelect"
import { Header2Padding } from "src/components/header2/Header2Padding"
import { Header2RightContainer } from "src/components/header2/Header2RightContainer"
import { Header2GithubLink } from "src/components/header2/Header2GithubAnchor"
import { Header2KyselyLink } from "src/components/header2/Header2KyselyLink"
import { Header2ShareButton } from "src/components/header2/Header2ShareButton"
import { Header2SettingsButton } from "src/components/header2/Header2SettingsButton"
import { Header2ModalContainer } from "src/components/header2/Header2ModalContainer"
import { Header2ShowTypescriptSchemaCheckboxButton } from "src/components/header2/Header2ShowTypescriptSchemaCheckboxButton"
import { Header2ShowSqlCheckboxButton } from "src/components/header2/Header2ShowSqlCheckboxButton"

export function Header2(): JSX.Element {
  return (
    <Header2Container>
      <Header2KyselyVersionSelect />
      <Header2Padding />
      <Header2SqlDialectSelect />
      <Header2Padding />
      <Header2ShowTypescriptSchemaCheckboxButton />
      <Header2ShowSqlCheckboxButton />
      <Header2ShareButton />
      <Header2Padding />
      <Header2SettingsButton />
      <Header2RightContainer>
        <Header2KyselyLink />
        <Header2Padding />
        <Header2GithubLink />
      </Header2RightContainer>
      <Header2ModalContainer />
    </Header2Container>
  )
}
