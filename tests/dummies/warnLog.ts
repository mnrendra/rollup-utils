import type { LogParams, LogParam, LogReturn } from '@/types'

import { COLORS } from '@/consts'

const warnLog = jest.fn<LogReturn, LogParams>((
  log: LogParam
): void => {
  const consoleLog = (msg: string): void => {
    const { WARN, RESET } = COLORS
    console.log(`${WARN}(!) ${msg}${RESET}`)
  }

  if (typeof log === 'string') consoleLog(log)
  else if (typeof log === 'function') log()
  else consoleLog(log.message)
})

export default warnLog
