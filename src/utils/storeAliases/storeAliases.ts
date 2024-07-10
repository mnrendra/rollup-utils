import type { Store } from '../../types'

import { parseTSConfigAlias } from '@mnrendra/tsconfig-alias-parser'

import { SKIPPED_STACK } from '../../consts'

/**
 * Store aliases from `tsconfig.json` into a store.
 *
 * @param {Store} store - A JSON object.
 */
const storeAliases = async (
  store: Store
): Promise <void> => {
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
