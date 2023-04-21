import { useRecoilState } from "recoil"
import { typescriptFormatOptionsState } from "src/lib/typescript/atoms/typescriptFormatOptionsState"
import { Header2SettingsBlock } from "src/components/header2/Header2SettingsBlock"
import { Header2StateKeyCheckbox } from "src/components/header2/Header2StateKeyCheckbox"

export function Header2SettingsTypescriptFormatBlock(): JSX.Element {
  const [typescriptFormatOptions, setTypescriptFormatOptions] = useRecoilState(typescriptFormatOptionsState)

  return (
    <Header2SettingsBlock title="typescriptFormat">
      <Header2StateKeyCheckbox keyName="semi" state={typescriptFormatOptions} onChange={setTypescriptFormatOptions} />
      <Header2StateKeyCheckbox
        keyName={"singleQuote"}
        state={typescriptFormatOptions}
        onChange={setTypescriptFormatOptions}
      />
    </Header2SettingsBlock>
  )
}
