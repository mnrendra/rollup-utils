import type { Store } from '../types'

import { parseTSConfigAlias } from '@mnrendra/tsconfig-alias-parser'

import { SKIPPED_STACK } from '../consts'

/**
 * To store the `aliases` from `tsconfig.json` in the `store`.
 *
 * It will automatically parse the `baseUrl` and `paths` from `tsconfig.json`
 * into `aliases` using `@mnrendra/tsconfig-alias-parser`, store them in the
 * `store`, and make them available for use by alias resolver plugins, such as
 * `@mnrendra/rollup-plugin-alias`.
 *
 * @param {Store} store - A `Store` object.
 *
 * @see https://www.npmjs.com/package/@mnrendra/rollup-utils#-storealiases
 */
const storeAliases = async (
  store: Store
): Promise<void> => {
  // Parse aliases from `tsconfig.json`.
  const aliases = await parseTSConfigAlias({
    skippedStacks: SKIPPED_STACK,
    stackTraceLimit: 15
  })

  // Save the plugin `aliases` to the store.
  store.aliases = aliases
}

// Export `storeAliases` as the default value.
export default storeAliases
