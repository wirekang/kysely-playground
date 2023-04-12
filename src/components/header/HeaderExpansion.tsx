import { useRecoilState, useRecoilValue } from "recoil"
import { expandHeaderState } from "src/lib/ui/atoms/expandHeaderState"
import { HeaderCheckbox } from "src/components/header/HeaderCheckbox"
import { typescriptFormatOptionsState } from "src/lib/typescript/atoms/typescriptFormatOptionsState"
import { sqlFormatOptionsState } from "src/lib/sql/atoms/sqlFormatOptionsState"

export function HeaderExpansion(): JSX.Element {
  const show = useRecoilValue(expandHeaderState)
  const [typescriptFormatOptions, setTypescriptFormatOptions] = useRecoilState(typescriptFormatOptionsState)
  const [sqlFormatOptions, setSqlFormatOptions] = useRecoilState(sqlFormatOptionsState)
  if (!show) {
    return <></>
  }

  return (
    <div
      style={{
        backgroundColor: "#333",
        borderRadius: 20,
        width: "100%",
        padding: 8,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      Typescript Format:
      <HeaderCheckbox id="semi" state={typescriptFormatOptions} changeState={setTypescriptFormatOptions} />
      <HeaderCheckbox id="singleQuote" state={typescriptFormatOptions} changeState={setTypescriptFormatOptions} />
      <br />
      SQL Format:
      <HeaderCheckbox id="lowerKeywords" state={sqlFormatOptions} changeState={setSqlFormatOptions} />
      <HeaderCheckbox id="inlineParameters" state={sqlFormatOptions} changeState={setSqlFormatOptions} />
    </div>
  )
}
