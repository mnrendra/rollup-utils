import type { Aliases, Store } from '@/types'

import store from '@tests/dummies/store'
import warnLog from '@tests/dummies/warnLog'
import mockedReadPackage from '@tests/mocks/readPackage'
import unmockReadPackage from '@tests/unmocks/readPackage'

import { COLORS, WARN_LOG, WARN_LOG_DEF } from '@/consts'

import {
  initStore,
  printInfo,
  storeAliases,
  disableOnwarn
} from '.'

jest.mock('@mnrendra/read-package', () => ({
  readPackage: jest.fn()
}))

describe('Test all utils:', () => {
  describe('Test `initStore` util:', () => {
    describe('By mocking `@mnrendra/read-package` to resolve a dummy data:', () => {
      beforeAll(() => {
        mockedReadPackage.mockResolvedValue({
          name: '@mnrendra/rollup-plugin-dummy',
          version: '0.0.0-development',
          homepage: 'http://localhost'
        })
      })

      afterAll(() => {
        unmockReadPackage(mockedReadPackage)
      })

      it('Should initialize the store with package data!', async () => {
        await initStore(store)

        expect(store.name).toBe('@mnrendra/rollup-plugin-dummy')
        expect(store.pluginName).toBe('dummy')
        expect(store.version).toBe('0.0.0-development')
        expect(store.homepage).toBe('http://localhost')
      })
    })

    describe('By mocking `@mnrendra/read-package` to resolve multiple dummy data:', () => {
      const names = ['first', 'second', 'third']

      let idx = 0

      const firstStore: Store = {
        pluginName: 'first',
        name: '@mnrendra/rollup-plugin-first',
        version: '1.0.0',
        homepage: 'http://localhost',
        aliases: []
      }

      const secondStore: Store = {
        pluginName: 'second',
        name: '@mnrendra/rollup-plugin-second',
        version: '2.0.0',
        homepage: 'http://localhost',
        aliases: []
      }

      const thirdStore: Store = {
        pluginName: 'third',
        name: '@mnrendra/rollup-plugin-third',
        version: '3.0.0',
        homepage: 'http://localhost',
        aliases: []
      }

      afterAll(() => {
        unmockReadPackage(mockedReadPackage)
      })

      describe('By executing `initStore` multiple times before checking each store:', () => {
        beforeEach(() => {
          mockedReadPackage.mockResolvedValue({
            name: `@mnrendra/rollup-plugin-${names[idx]}`,
            version: `${idx + 1}.0.0`,
            homepage: 'http://localhost'
          })

          idx++
        })

        it('Should initialize the first store with the first data!', async () => {
          await initStore(firstStore)

          expect(firstStore.name).toBe('@mnrendra/rollup-plugin-first')
          expect(firstStore.pluginName).toBe('first')
          expect(firstStore.version).toBe('1.0.0')
          expect(firstStore.homepage).toBe('http://localhost')
        })

        it('Should initialize the second store with the second data!', async () => {
          await initStore(secondStore)

          expect(secondStore.name).toBe('@mnrendra/rollup-plugin-second')
          expect(secondStore.pluginName).toBe('second')
          expect(secondStore.version).toBe('2.0.0')
          expect(secondStore.homepage).toBe('http://localhost')
        })

        it('Should initialize the third store with the third data!', async () => {
          await initStore(thirdStore)

          expect(thirdStore.name).toBe('@mnrendra/rollup-plugin-third')
          expect(thirdStore.pluginName).toBe('third')
          expect(thirdStore.version).toBe('3.0.0')
          expect(thirdStore.homepage).toBe('http://localhost')
        })
      })

      it('Should able to memorize the first data!', async () => {
        expect(firstStore.name).toBe('@mnrendra/rollup-plugin-first')
        expect(firstStore.pluginName).toBe('first')
        expect(firstStore.version).toBe('1.0.0')
        expect(firstStore.homepage).toBe('http://localhost')
      })

      it('Should able to memorize the second data!', async () => {
        expect(secondStore.name).toBe('@mnrendra/rollup-plugin-second')
        expect(secondStore.pluginName).toBe('second')
        expect(secondStore.version).toBe('2.0.0')
        expect(secondStore.homepage).toBe('http://localhost')
      })

      it('Should able to memorize the first data!', async () => {
        expect(firstStore.name).toBe('@mnrendra/rollup-plugin-first')
        expect(firstStore.pluginName).toBe('first')
        expect(firstStore.version).toBe('1.0.0')
        expect(firstStore.homepage).toBe('http://localhost')
      })

      it('Should able to memorize the second data!', async () => {
        expect(secondStore.name).toBe('@mnrendra/rollup-plugin-second')
        expect(secondStore.pluginName).toBe('second')
        expect(secondStore.version).toBe('2.0.0')
        expect(secondStore.homepage).toBe('http://localhost')
      })
    })
  })

  describe('Test `printInfo` util:', () => {
    let cl: jest.SpyInstance

    beforeEach(() => {
      cl = jest.spyOn(console, 'log').mockImplementation(() => {})
    })

    afterEach(() => {
      cl.mockRestore()
    })

    describe('By mocking `@mnrendra/read-package` to resolve a dummy data:', () => {
      const { PRIMARY, SECONDARY, RESET } = COLORS

      beforeAll(async () => {
        mockedReadPackage.mockResolvedValue({
          name: '@mnrendra/rollup-plugin-dummy',
          version: '0.0.0-development',
          homepage: 'http://localhost'
        })

        await initStore(store)
      })

      afterAll(() => {
        unmockReadPackage(mockedReadPackage)
      })

      it('Should print a log containing the plugin\'s `pluginName`!', () => {
        printInfo(store)

        expect(cl).toHaveBeenCalled()
        expect(cl).toHaveBeenCalledTimes(1)
        expect(cl.mock.calls[0][0]).toContain(store.pluginName)
      })

      it('Should print a log containing the plugin\'s `version`!', () => {
        printInfo(store)

        expect(cl).toHaveBeenCalled()
        expect(cl).toHaveBeenCalledTimes(1)
        expect(cl.mock.calls[0][0]).toContain(store.version)
      })

      it('Should print a log containing the plugin\'s `pluginName` and `version`!', () => {
        printInfo(store)

        expect(cl).toHaveBeenCalled()
        expect(cl).toHaveBeenCalledTimes(1)
        expect(cl.mock.calls[0][0]).toContain(store.pluginName)
        expect(cl.mock.calls[0][0]).toContain(store.version)
      })

      it('Should print a log containing the plugin\'s `pluginName` and `version` with colors!', () => {
        printInfo(store)

        expect(cl).toHaveBeenCalled()
        expect(cl).toHaveBeenCalledTimes(1)
        expect(cl).toHaveBeenCalledWith(`${PRIMARY}• ${store.pluginName}: ${SECONDARY}${store.version}${RESET}`)
      })
    })
  })

  describe('Test `storeAliases` util:', () => {
    it('Should able to memorize the first data!', async () => {
      await storeAliases(store)

      const received = store.aliases
      const expected: Aliases = [{ alias: '@', path: './src' }, { alias: '@tests', path: './tests' }]

      expect(received).toEqual(expected)
    })
  })

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
})
