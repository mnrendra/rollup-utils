# @mnrendra/rollup-utils
🍣 [Rollup](https://rollupjs.org/) plugin utilities.

## Install
```bash
npm i @mnrendra/rollup-utils
```

## Usage

### Use in your plugin development:

`yourPlugin/store.ts`
```typescript
import type { Store } from '@mnrendra/rollup-utils'

const store: Store = {
  pluginName: '', // `Rollup` plugin name
  name: '', // `package.json` name
  version: '', // `package.json` version
  homepage: '', // `package.json` homepage
}

export default store
```

`yourPlugin/index.ts`
```typescript
import type { Plugin } from 'rollup'

import {
  initStore,
  printInfo
} from '@mnrendra/rollup-utils'

import store from './store'

/**
 * Rollup plugin.
 *
 * @returns {Promise<Plugin>} Rollup plugin object.
 */
const main = async (): Promise<Plugin> => {
  // Initialize store.
  await initStore(store, { any: null })

  // Print info.
  printInfo(store)

  // Return Rollup plugin object.
  return {
    /**
     * Rollup properties
     */
    name: store.pluginName,
    version: store.version
  }
}

export default main
```

## Utilities

### • initStore
To initialize the `store` to save the expensive data (e.g., `package.json` values).
```typescript
import type { Store } from '@mnrendra/rollup-utils'

type InitStore = <T extends Record<string, any> = Record<string, any>>(store: Store, additional?: T) => Promise<void>
```
It automatically read `package.json` and store the required properties in the `store`.

### • printInfo
To print `Rollup` plugin information from the `store`.
```typescript
import type { Store } from '@mnrendra/rollup-utils'

type PrintInfo = (store: Store) => void
```
The current format is: `• pluginName: version`. If you wish to change the format, please request it [here](https://github.com/mnrendra/rollup-utils/issues).

## Types
```typescript
import type {
  Store
} from '@mnrendra/rollup-utils'
```

## License
[MIT](https://github.com/mnrendra/rollup-utils/blob/HEAD/LICENSE)

## Author
[@mnrendra](https://github.com/mnrendra)
