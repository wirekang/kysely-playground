import { Header2CheckboxButton } from "src/components/header2/Header2CheckboxButton"
import { useRecoilState } from "recoil"
import { showTypescriptSchemaState } from "src/lib/ui/atoms/showTypescriptSchemaState"

export function Header2ShowTypescriptSchemaCheckboxButton(): JSX.Element {
  const [showTypescriptSchema, setShowTypescriptSchema] = useRecoilState(showTypescriptSchemaState)
  return <Header2CheckboxButton title="schema" checked={showTypescriptSchema} onChange={setShowTypescriptSchema} />
}
