import { useRecoilState, useRecoilValue } from "recoil"
import { kyselyVersionState } from "src/lib/kysely/atoms/kyselyVersionState"
import { typescriptGlobalTypesState } from "src/lib/typescript/atoms/typescriptGlobalTypesState"
import { useLoadingScopeEffect } from "src/lib/loading/hooks/useLoadingScopeEffect"
import { ModuleUtils } from "src/lib/module/ModuleUtils"
import { EditorUtils } from "src/lib/editor/EditorUtils"

export function useSetKyselyGlobalType() {
  const [, setTypescriptGlobalTypes] = useRecoilState(typescriptGlobalTypesState)
  const kyselyVersion = useRecoilValue(kyselyVersionState)

  useLoadingScopeEffect(
    "kyselyType",
    async () => {
      const results = await Promise.all(
        ModuleUtils.getAllModuleVersions(kyselyVersion).map(async ({ mv, name }) => {
          return {
            path: EditorUtils.makeTypeFilePath(name),
            value: `declare module "${name}" {\n\n${(await mv.type()).default}\n\n}`,
          }
        })
      )
      setTypescriptGlobalTypes((v) => {
        const newObject = { ...v }
        results.forEach(({ path, value }) => {
          newObject[path] = value
        })
        return newObject
      })
    },
    [kyselyVersion, setTypescriptGlobalTypes]
  )
}
