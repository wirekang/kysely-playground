import { useMonaco } from "src/lib/editor/contexts/MonacoContext"

export function MonacoWrapper({ children }: any): JSX.Element {
  const monaco = useMonaco()
  if (monaco === null) {
    return <>LOADING...</>
  }

  return <>{children}</>
}
