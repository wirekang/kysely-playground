export type StoreItem = {
  /**
   * @description typescriptSchema
   */
  s?: string

  /**
   * @description typescriptQuery
   */
  q?: string

  /**
   * @description sqlDialect {@link SqlDialect}
   */
  d?: string

  /**
   * @description kyselyVersion
   */
  v?: string

  /**
   * @description showTypescriptSchema
   */
  c?: boolean
}
