import { WARN_LOG, WARN_LOG_DEF } from '@/consts'

import warnLog from '@tests/dummies/warnLog'

import disableOnwarn from './disableOnwarn'

describe('Test `disableOnwarn` util:', () => {
  let cl: jest.SpyInstance

  beforeEach(() => {
    cl = jest.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    cl.mockRestore()
  })

  describe(`Test \`${WARN_LOG_DEF}\` warning:`, () => {
    const code = WARN_LOG_DEF
    const message = WARN_LOG[code]

    it('Should disable the warning log when given an empty argument!', () => {
      const received = disableOnwarn()

      received({ code, message }, warnLog)

      expect(warnLog).not.toHaveBeenCalled()
      expect(cl).not.toHaveBeenCalled()
    })

    it(`Should disable the warning log when given a \`${code}\` string code!`, () => {
      const received = disableOnwarn(code)

      received({ code, message }, warnLog)

      expect(warnLog).not.toHaveBeenCalled()
      expect(cl).not.toHaveBeenCalled()
    })

    it(`Should disable the warning log when given an array containing \`${code}\` string codes!`, () => {
      const received = disableOnwarn([code])

      received({ code, message }, warnLog)

      expect(warnLog).not.toHaveBeenCalled()
      expect(cl).not.toHaveBeenCalled()
    })
  })

  describe('Test any warnings:', () => {
    const code = 'ANY'
    const message = 'Any warnings!'

    it('Should keep logging when given an empty argument and the code is not in the disable list!', () => {
      const received = disableOnwarn()

      received({ code, message }, warnLog)

      expect(warnLog).toHaveBeenCalled()
      expect(warnLog).toHaveBeenCalledTimes(1)
      expect(cl.mock.calls[0][0]).toContain(`(!) ${message}`)
    })

    it(`Should keep logging when given a \`${WARN_LOG_DEF}\` string code and the code is not in the disable list!`, () => {
      const received = disableOnwarn(WARN_LOG_DEF)

      received({ code, message }, warnLog)

      expect(warnLog).toHaveBeenCalled()
      expect(warnLog).toHaveBeenCalledTimes(1)
      expect(cl.mock.calls[0][0]).toContain(`(!) ${message}`)
    })

    it(`Should keep logging when given an array containing \`${WARN_LOG_DEF}\` string codes and the code is not in the disable list!`, () => {
      const received = disableOnwarn([WARN_LOG_DEF])

      received({ code, message }, warnLog)

      expect(warnLog).toHaveBeenCalled()
      expect(warnLog).toHaveBeenCalledTimes(1)
      expect(cl.mock.calls[0][0]).toContain(`(!) ${message}`)
    })
  })

  describe('Test generic warnings:', () => {
    const code = 'GENERIC'
    const message = 'Generic warnings!'

    it(`Should disable the warning log when given a \`${code}\` string code!`, () => {
      const received = disableOnwarn(code)

      received({ code, message }, warnLog)

      expect(warnLog).not.toHaveBeenCalled()
      expect(cl).not.toHaveBeenCalled()
    })

    it(`Should keep logging the \`${WARN_LOG_DEF}\` warning log when given a \`${code}\` string code!`, () => {
      const received = disableOnwarn(code)

      received({
        code: WARN_LOG_DEF,
        message: WARN_LOG[WARN_LOG_DEF]
      }, warnLog)

      expect(warnLog).toHaveBeenCalled()
      expect(warnLog).toHaveBeenCalledTimes(1)
      expect(cl.mock.calls[0][0]).toContain(`(!) ${WARN_LOG[WARN_LOG_DEF]}`)
    })

    it(`Should disable the warning log when given an array containing \`${code}\` string codes!`, () => {
      const received = disableOnwarn([code])

      received({ code, message }, warnLog)

      expect(warnLog).not.toHaveBeenCalled()
      expect(cl).not.toHaveBeenCalled()
    })

    it(`Should keep logging the \`${WARN_LOG_DEF}\` warning log when given an array containing \`${code}\` string codes!`, () => {
      const received = disableOnwarn([code])

      received({
        code: WARN_LOG_DEF,
        message: WARN_LOG[WARN_LOG_DEF]
      }, warnLog)

      expect(warnLog).toHaveBeenCalled()
      expect(warnLog).toHaveBeenCalledTimes(1)
      expect(cl.mock.calls[0][0]).toContain(`(!) ${WARN_LOG[WARN_LOG_DEF]}`)
    })
  })
})
