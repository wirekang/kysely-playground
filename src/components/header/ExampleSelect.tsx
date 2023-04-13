import { HeaderSelect } from "src/components/header/HeaderSelect"
import { HeaderOption } from "src/components/header/HeaderOption"

export function ExampleSelect(): JSX.Element {
  return (
    <HeaderSelect title="examples">
      <HeaderOption value=""></HeaderOption>
      <HeaderOption value="">simple select</HeaderOption>
    </HeaderSelect>
  )
}
