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
 * @param {Record<string, any>} additional - Additional store properties.
 *
 * @see https://www.npmjs.com/package/@mnrendra/rollup-utils#-initstore
 */
const initStore = async <T extends Record<string, any> = Record<string, any>>(
  store: Store,
  additional: T = {} as unknown as T
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

  // Save the additional store properties.
  Object.keys(additional).forEach((key) => {
    (store as any)[key] = additional[key]
  })
}

// Export `initStore` as the default value.
export default initStore
