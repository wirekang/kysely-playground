import { Header2SettingsTypescriptFormatBlock } from "src/components/header2/Header2SettingsTypescriptFormatBlock"
import { Header2SettingsSqlFormatBlock } from "src/components/header2/Header2SettingsSqlFormatBlock"
import { Header2HorizontalPadding } from "src/components/header2/Header2HorizontalPadding"

export function Header2SettingsModal(): JSX.Element {
  return (
    <div>
      <Header2SettingsTypescriptFormatBlock />
      <Header2HorizontalPadding />
      <Header2SettingsSqlFormatBlock />
    </div>
  )
}
