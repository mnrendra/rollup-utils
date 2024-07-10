import type { Aliases } from '@/types'

import store from '@tests/dummies/store'

import index from '.'

describe('Test `storeAliases` util:', () => {
  it('Should able to memorize the first data!', async () => {
    await index(store)

    const received = store.aliases
    const expected: Aliases = [{ alias: '@', path: './src' }, { alias: '@tests', path: './tests' }]

    expect(received).toEqual(expected)
  })
})
