import type { Store } from '../../types'

import { COLORS } from '../../consts'

/**
 * Print Rollup plugin info from the store.
 *
 * @param {Store} store - An `@mnrendrsa/rollup-plugin` `store` object.
 */
const printInfo = ({
  pluginName,
  version
}: Store): void => {
  // Get colors.
  const { PRIMARY, SECONDARY, RESET } = COLORS

  // Print 'info' using colors.
  console.log(`${PRIMARY}• ${pluginName}: ${SECONDARY}${version}${RESET}`)
}

// Export `printInfo` as the default value.
export default printInfo
