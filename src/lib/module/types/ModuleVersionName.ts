import { MODULES } from "src/generated/modules"
import { ModuleName } from "src/lib/module/types/ModuleName"

export type ModuleVersionName<T extends ModuleName> = keyof (typeof MODULES)[T]
