# @mnrendra/rollup-utils
🍣 [Rollup](https://rollupjs.org/) plugin utilities.

## Install
```bash
npm i @mnrendra/rollup-utils
```

## Usage

`yourPlugin/store.ts`
```typescript
import type { Store } from '@mnrendra/rollup-utils'

const store: Store = {
  pluginName: 'your-plugin-name',
  name: 'your-module-name',
  version: 'your-module-version',
  homepage: 'your-module-homepage'
}

export default store
```

`yourPlugin/index.ts`
```typescript
import type { Plugin } from 'rollup'

import { initStore, printInfo } from '@mnrendra/rollup-utils'

import store from './store'

/**
 * Rollup plugin.
 *
 * @returns {Promise<Plugin>} Rollup plugin object.
 */
const main = async (): Promise<Plugin> => {
  // Initialize store.
  await initStore(store)

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
To initialize a `store` to save expensive data (e.g., `package.json` values).

### • printInfo
To print `Rollup` plugin information from the store.

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
