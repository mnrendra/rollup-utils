import type { Store } from '../types'

import { COLORS } from '../consts'

/**
 * To print `Rollup` plugin information from the `store`.
 *
 * The current format is: `• pluginName: version`. If you wish to change the
 * format, please request it at https://github.com/mnrendra/rollup-utils/issues.
 *
 * @param {Store} store - A `Store` object.
 *
 * @see https://www.npmjs.com/package/@mnrendra/rollup-utils#-printinfo
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
