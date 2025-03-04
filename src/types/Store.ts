/**
 * `@mnrendra/rollup-utils` interface to validate the `store` properties.
 *
 * A `Store` must have:
 *
 * - pluginName: A `string` to store your `Rollup` plugin name.
 * - name: A `string` to store your `package.json` name.
 * - version: A `string` to store your `package.json` version.
 * - homepage: A `string` to store your `package.json` homepage.
 * - aliases: An array of `Aliases` to store alias values from
 * `@mnrendra/tsconfig-alias-parser`.
 *
 * @see https://www.npmjs.com/package/@mnrendra/rollup-utils#usage
 */
export interface Store {
  /**
   * Your `Rollup` plugin name that will be read by `Rollup`.
   */
  pluginName: string

  /**
   * Your package `name`, read from `package.json`, that will be converted into
   * `pluginName`.
   */
  name: string

  /**
   * Your package `version`, read from `package.json`, that will be used by
   * `Rollup`.
   */
  version: string

  /**
   * Your package `homepage`, read from `package.json`, that will be utilized by
   * `@mnrendra/rollup-utils` utilities in their error handler to provide the
   * more info link.
   */
  homepage: string
}
