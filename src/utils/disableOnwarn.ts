import type {
  WarningHandlerWithDefault,
  RollupLog,
  LoggingFunction,
  WarnCodeGeneric,
  WarnCode
} from '../types'

import { WARN_LOG_DEF } from '../consts'

/**
 * To disable `Rollup` warning logs.
 *
 * If you wish to add any warning code enums as reserved enums and avoid adding
 * your own generics, please feel free to request them at
 * https://github.com/mnrendra/rollup-utils/issues. We will add them officially
 * as soon as possible. Thank you!
 *
 * @param {WarnCode} [warnCode] - A `Rollup` warning code can be either a
 * `string` or an `array` (a list of `Rollup` warning codes).
 *
 * @returns {WarningHandlerWithDefault} Rollup `onwarn` function.
 *
 * @see https://www.npmjs.com/package/@mnrendra/rollup-utils#-disableonwarn
 */
const disableOnwarn = <Code extends WarnCodeGeneric = typeof WARN_LOG_DEF>(
  warnCode: WarnCode<Code> = WARN_LOG_DEF as WarnCode<Code>
): WarningHandlerWithDefault => {
  // Validate warning codes.
  const warnCodes: string[] = Array.isArray(warnCode) ? warnCode : [warnCode]

  /**
   * Rollup `onwarn` function.
   *
   * @param {RollupLog} warning - Rollup `warning` object.
   * @param {LoggingFunction} defaultHandler - Rollup logging function.
   *
   * @see https://rollupjs.org/configuration-options/#onwarn
   */
  const onwarn: WarningHandlerWithDefault = (
    warning: RollupLog,
    defaultHandler: LoggingFunction
  ): void => {
    // Extract `code` from `warning`.
    const { code } = warning

    // Only log the warning if the `code` is not included in `warnCodes`.
    if (typeof code !== 'string' || !warnCodes.includes(code)) {
      defaultHandler(warning)
    }
  }

  // Return `onwarn` as the returned value.
  return onwarn
}

// Export `disableOnwarn` as the default value.
export default disableOnwarn
