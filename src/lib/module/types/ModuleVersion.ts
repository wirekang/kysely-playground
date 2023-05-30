export type ModuleVersion = {
  module: () => Promise<any>
  type: () => Promise<{ default: string }>
}
