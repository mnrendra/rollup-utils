import store from '@tests/dummies/store'
import mockedReadPackage from '@tests/mocks/readPackage'
import unmockReadPackage from '@tests/unmocks/readPackage'

import { COLORS } from '@/consts'
import initStore from '@/utils/initStore'

import printInfo from './printInfo'

jest.mock('@mnrendra/read-package', () => ({
  readPackage: jest.fn()
}))

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
