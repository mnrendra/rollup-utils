import { normalize } from 'node:path'

export const SCOPE = '@mnrendra'

export const NAME = 'rollup-utils'

export const PLUGIN_PREFIX = 'rollup-plugin-'

export const DIST_NAME = `${SCOPE}/${NAME}`

export const DIST_PLUGIN_PREFIX = `${SCOPE}/${PLUGIN_PREFIX}`

export const DIST_PATH = `node_modules/${DIST_NAME}`

export const DIST_PLUGIN_PATH_PREFIX = `node_modules/${DIST_PLUGIN_PREFIX}`

export const SKIPPED_STACK = normalize(DIST_PATH)

export const ANSI_COLORS = {
  RESET: '\x1b[0m',
  BRIGHT_YELLOW: '\x1b[93m',
  BRIGHT_BLACK: '\x1b[90m'
}

export const COLORS = {
  RESET: ANSI_COLORS.RESET,
  PRIMARY: ANSI_COLORS.BRIGHT_YELLOW,
  SECONDARY: ANSI_COLORS.BRIGHT_BLACK
}
