import store from '@tests/dummies/store'
import mockedReadPackage from '@tests/mocks/readPackage'
import unmockReadPackage from '@tests/unmocks/readPackage'

import { COLORS } from '@/consts'
import initStore from '@/utils/initStore'

import index from '.'

jest.mock('@mnrendra/read-package', () => ({
  readPackage: jest.fn()
}))

describe('Test `printInfo` util:', () => {
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

    let print: jest.SpyInstance

    beforeEach(() => {
      print = jest.spyOn(console, 'log').mockImplementation(() => {})
    })

    afterEach(() => {
      print.mockRestore()
    })

    it('Should print a log containing the plugin\'s `pluginName`!', () => {
      index(store)

      expect(print).toHaveBeenCalled()
      expect(print).toHaveBeenCalledTimes(1)
      expect(print.mock.calls[0][0]).toContain(store.pluginName)
    })

    it('Should print a log containing the plugin\'s `version`!', () => {
      index(store)

      expect(print).toHaveBeenCalled()
      expect(print).toHaveBeenCalledTimes(1)
      expect(print.mock.calls[0][0]).toContain(store.version)
    })

    it('Should print a log containing the plugin\'s `pluginName` and `version`!', () => {
      index(store)

      expect(print).toHaveBeenCalled()
      expect(print).toHaveBeenCalledTimes(1)
      expect(print.mock.calls[0][0]).toContain(store.pluginName)
      expect(print.mock.calls[0][0]).toContain(store.version)
    })

    it('Should print a log containing the plugin\'s `pluginName` and `version` with colors!', () => {
      index(store)

      expect(print).toHaveBeenCalled()
      expect(print).toHaveBeenCalledTimes(1)
      expect(print).toHaveBeenCalledWith(`${PRIMARY}• ${store.pluginName}: ${SECONDARY}${store.version}${RESET}`)
    })
  })
})
