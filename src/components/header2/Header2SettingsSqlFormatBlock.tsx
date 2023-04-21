import { useRecoilState } from "recoil"
import { Header2SettingsBlock } from "src/components/header2/Header2SettingsBlock"
import { Header2StateKeyCheckbox } from "src/components/header2/Header2StateKeyCheckbox"
import { sqlFormatOptionsState } from "src/lib/sql/atoms/sqlFormatOptionsState"

export function Header2SettingsSqlFormatBlock(): JSX.Element {
  const [sqlFormatOptions, setSqlFormatOptions] = useRecoilState(sqlFormatOptionsState)
  return (
    <Header2SettingsBlock title="sqlFormat">
      <Header2StateKeyCheckbox keyName={"inlineParameters"} state={sqlFormatOptions} onChange={setSqlFormatOptions} />
      <Header2StateKeyCheckbox keyName={"lowerKeywords"} state={sqlFormatOptions} onChange={setSqlFormatOptions} />
    </Header2SettingsBlock>
  )
}
