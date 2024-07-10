import type { Store } from '@/types'

import store from '@tests/dummies/store'
import mockedReadPackage from '@tests/mocks/readPackage'
import unmockReadPackage from '@tests/unmocks/readPackage'

import initStore from './initStore'

jest.mock('@mnrendra/read-package', () => ({
  readPackage: jest.fn()
}))

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
