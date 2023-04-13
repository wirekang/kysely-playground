import { useRecoilState, useRecoilValue } from "recoil"
import { expandHeaderState } from "src/lib/ui/atoms/expandHeaderState"
import { HeaderExpansionCheckbox } from "src/components/header/HeaderExpansionCheckbox"
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
      <HeaderExpansionCheckbox id="semi" state={typescriptFormatOptions} changeState={setTypescriptFormatOptions} />
      <HeaderExpansionCheckbox
        id="singleQuote"
        state={typescriptFormatOptions}
        changeState={setTypescriptFormatOptions}
      />
      <br />
      SQL Format:
      <HeaderExpansionCheckbox id="lowerKeywords" state={sqlFormatOptions} changeState={setSqlFormatOptions} />
      <HeaderExpansionCheckbox id="inlineParameters" state={sqlFormatOptions} changeState={setSqlFormatOptions} />
    </div>
  )
}
