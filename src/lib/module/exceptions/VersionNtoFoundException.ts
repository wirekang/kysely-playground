export class VersionNtoFoundException extends Error {
  constructor(readonly moduleName: string, readonly version: string) {
    super(`${moduleName}: ${version}`)
  }
}
