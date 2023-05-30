import type { ModuleName } from "src/lib/module/types/ModuleName"
import { MODULES } from "src/generated/modules"
import { VersionNtoFoundException } from "src/lib/module/exceptions/VersionNtoFoundException"
import { ModuleVersion } from "src/lib/module/types/ModuleVersion"
import { ModuleFunction } from "src/lib/module/types/ModuleFunction"
import { ModuleVersionName } from "src/lib/module/types/ModuleVersionName"

export class ModuleUtils {
  static getVersionNames(moduleName: ModuleName): string[] {
    return Object.keys(this.getModule(moduleName)).map(String)
  }

  static getAllModuleVersions(version: string): { mv: ModuleVersion; name: string }[] {
    const moduleNames: ModuleName[] = Object.keys(MODULES) as any
    const moduleVersions: { mv: ModuleVersion; name: string }[] = []
    moduleNames.forEach((moduleName) => {
      try {
        moduleVersions.push({
          mv: this.getModuleVersion(moduleName, version as any),
          name: moduleName,
        })
      } catch (e: any) {
        if (e instanceof VersionNtoFoundException) {
          return
        }
        throw e
      }
    })
    return moduleVersions
  }

  static async makeModuleFunction(version: string): Promise<ModuleFunction> {
    const m = {} as Record<string, any>
    await Promise.all(
      this.getAllModuleVersions(version).map(async ({ name, mv }) => {
        m[name] = await mv.module()
      })
    )
    return (mn) => {
      const r = m[mn]
      if (!r) {
        throw Error(`Module ${mn} not found. Please check the version.`)
      }
      return r
    }
  }

  static getModuleVersion<T extends ModuleName, V extends ModuleVersionName<T>>(
    moduleName: T,
    version: V
  ): (typeof MODULES)[T][V] {
    const v = (this.getModule(moduleName) as any)[version]
    if (!v) {
      throw new VersionNtoFoundException(moduleName, String(version))
    }
    return v
  }

  private static getModule(moduleName: ModuleName) {
    const module = MODULES[moduleName]
    if (!module) {
      throw Error(`Illegal module name: ${moduleName}`)
    }
    return module
  }
}
