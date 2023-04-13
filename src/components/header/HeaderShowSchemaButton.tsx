import { HeaderCheckboxButton } from "src/components/header/HeaderCheckboxButton"
import { useRecoilState } from "recoil"
import { showTypescriptSchemaState } from "src/lib/ui/atoms/showTypescriptSchemaState"

export function HeaderShowSchemaButton(): JSX.Element {
  const [showTypescriptSchema, setShowTypescriptSchema] = useRecoilState(showTypescriptSchemaState)
  const toggle = () => {
    setShowTypescriptSchema((v) => !v)
  }

  return <HeaderCheckboxButton label="schema" checked={showTypescriptSchema} onToggle={toggle} />
}
