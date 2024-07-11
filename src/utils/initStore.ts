import type { Store } from '../types'

import { readPackage } from '@mnrendra/read-package'

import { SKIPPED_STACK, DIST_PLUGIN_PREFIX } from '../consts'

/**
 * To initialize the `store` to save the expensive data (e.g., `package.json`
 * values).
 *
 * It will automatically read `package.json` and store the required properties
 * in the `store`.
 *
 * @param {Store} store - An empty `Store` object.
 *
 * @see https://www.npmjs.com/package/@mnrendra/rollup-utils#-initstore
 */
const initStore = async (
  store: Store
): Promise<void> => {
  // Read the plugin's `package.json` by skipping this package name.
  const { name, version, homepage } = await readPackage({
    skippedStacks: SKIPPED_STACK,
    stackTraceLimit: 10
  })

  // Get the plugin name.
  const pluginName = name.replace(DIST_PLUGIN_PREFIX, '')

  // Save the plugin `pluginName` to the store.
  store.pluginName = `${pluginName}`

  // Save the plugin `name` to the store.
  store.name = `${name}`

  // Save the plugin `version` to the store.
  store.version = `${version}`

  // Save the plugin `homepage` to the store.
  store.homepage = `${homepage}`
}

// Export `initStore` as the default value.
export default initStore
