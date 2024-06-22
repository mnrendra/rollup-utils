# @mnrendra/rollup-utils
🍣 [Rollup](https://rollupjs.org/) plugin utilities.

## Install
```bash
npm i @mnrendra/rollup-utils
```

## Usage

`yourPlugin/index.ts`
```javascript
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
  await printInfo(store)

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

`yourPlugin/store.ts`
```javascript
import type { Store } from '@mnrendra/rollup-utils'

const store: Store = {
  pluginName: 'your-plugin-name',
  name: 'your-module-name',
  version: 'your-module-version',
  homepage: 'your-module-homepage'
}

export default store
```

## Utilities

### • initStore
To initialize the store to save the plugin package data.

### • printInfo
To print Rollup plugin info from the store.

## Types

### • Store
Store interface.

## License
[MIT](https://github.com/mnrendra/rollup-utils/blob/HEAD/LICENSE)

## Author
[@mnrendra](https://github.com/mnrendra)
