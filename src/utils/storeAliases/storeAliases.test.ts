import type { Aliases } from '@/types'

import store from '@tests/dummies/store'

import storeAliases from './storeAliases'

describe('Test `storeAliases` util:', () => {
  it('Should able to memorize the first data!', async () => {
    await storeAliases(store)

    const received = store.aliases
    const expected: Aliases = [{ alias: '@', path: './src' }, { alias: '@tests', path: './tests' }]

    expect(received).toEqual(expected)
  })
})
