import type { Store } from './types'

import { COLORS } from './consts'

import mockedReadPackage from '@tests/mocks/readPackage'
import unmockReadPackage from '@tests/unmocks/readPackage'

import { initStore, printInfo } from '.'

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
        const store: Store = {}

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

      const firstStore: Store = {}
      const secondStore: Store = {}
      const thirdStore: Store = {}

      afterAll(() => {
        unmockReadPackage(mockedReadPackage)
      })

      describe('By executing `initStore` multiple times before checking each store:', () => {
        beforeEach(() => {
          mockedReadPackage.mockResolvedValue({
            name: `@mnrendra/rollup-plugin-${names[idx]}`,
            version: `${idx + 1}.0.0-development`,
            homepage: 'http://localhost'
          })

          idx++
        })

        it('Should initialize the first store with the first data!', async () => {
          await initStore(firstStore)

          expect(firstStore.name).toBe('@mnrendra/rollup-plugin-first')
          expect(firstStore.pluginName).toBe('first')
          expect(firstStore.version).toBe('1.0.0-development')
          expect(firstStore.homepage).toBe('http://localhost')
        })

        it('Should initialize the second store with the second data!', async () => {
          await initStore(secondStore)

          expect(secondStore.name).toBe('@mnrendra/rollup-plugin-second')
          expect(secondStore.pluginName).toBe('second')
          expect(secondStore.version).toBe('2.0.0-development')
          expect(secondStore.homepage).toBe('http://localhost')
        })

        it('Should initialize the third store with the third data!', async () => {
          await initStore(thirdStore)

          expect(thirdStore.name).toBe('@mnrendra/rollup-plugin-third')
          expect(thirdStore.pluginName).toBe('third')
          expect(thirdStore.version).toBe('3.0.0-development')
          expect(thirdStore.homepage).toBe('http://localhost')
        })
      })

      it('Should able to memorize the first data!', async () => {
        expect(firstStore.name).toBe('@mnrendra/rollup-plugin-first')
        expect(firstStore.pluginName).toBe('first')
        expect(firstStore.version).toBe('1.0.0-development')
        expect(firstStore.homepage).toBe('http://localhost')
      })

      it('Should able to memorize the second data!', async () => {
        expect(secondStore.name).toBe('@mnrendra/rollup-plugin-second')
        expect(secondStore.pluginName).toBe('second')
        expect(secondStore.version).toBe('2.0.0-development')
        expect(secondStore.homepage).toBe('http://localhost')
      })

      it('Should able to memorize the first data!', async () => {
        expect(firstStore.name).toBe('@mnrendra/rollup-plugin-first')
        expect(firstStore.pluginName).toBe('first')
        expect(firstStore.version).toBe('1.0.0-development')
        expect(firstStore.homepage).toBe('http://localhost')
      })

      it('Should able to memorize the second data!', async () => {
        expect(secondStore.name).toBe('@mnrendra/rollup-plugin-second')
        expect(secondStore.pluginName).toBe('second')
        expect(secondStore.version).toBe('2.0.0-development')
        expect(secondStore.homepage).toBe('http://localhost')
      })
    })
  })

  describe('Test `printInfo` util:', () => {
    describe('By mocking `@mnrendra/read-package` to resolve a dummy data:', () => {
      const { PRIMARY, SECONDARY, RESET } = COLORS

      const store: Store = {}

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

      let print: jest.SpyInstance

      beforeEach(() => {
        print = jest.spyOn(console, 'log').mockImplementation(() => {})
      })

      afterEach(() => {
        print.mockRestore()
      })

      it('Should print a log containing the plugin\'s `pluginName`!', async () => {
        await printInfo(store)

        expect(print).toHaveBeenCalled()
        expect(print).toHaveBeenCalledTimes(1)
        expect(print.mock.calls[0][0]).toContain(store.pluginName)
      })

      it('Should print a log containing the plugin\'s `version`!', async () => {
        await printInfo(store)

        expect(print).toHaveBeenCalled()
        expect(print).toHaveBeenCalledTimes(1)
        expect(print.mock.calls[0][0]).toContain(store.version)
      })

      it('Should print a log containing the plugin\'s `pluginName` and `version`!', async () => {
        await printInfo(store)

        expect(print).toHaveBeenCalled()
        expect(print).toHaveBeenCalledTimes(1)
        expect(print.mock.calls[0][0]).toContain(store.pluginName)
        expect(print.mock.calls[0][0]).toContain(store.version)
      })

      it('Should print a log containing the plugin\'s `pluginName` and `version` with colors!', async () => {
        await printInfo(store)

        expect(print).toHaveBeenCalled()
        expect(print).toHaveBeenCalledTimes(1)
        expect(print).toHaveBeenCalledWith(`${PRIMARY}• ${store.pluginName}: ${SECONDARY}${store.version}${RESET}`)
      })
    })
  })
})
