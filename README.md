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
  aliases: [] // `@mnrendra/types-aliases` value
}

export default store
```

`yourPlugin/index.ts`
```typescript
import type { Plugin } from 'rollup'

import {
  initStore,
  printInfo,
  storeAliases
} from '@mnrendra/rollup-utils'

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

  // Store aliases.
  await storeAliases(store)

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

### Use in your config:

`yourProject/rollup.config.mjs`
```javascript
import {
  disableOnwarn
} from '@mnrendra/rollup-utils'

export default {
  onwarn: disableOnwarn()
}
```

## Utilities

### • initStore
To initialize a `store` to save expensive data (e.g., `package.json` values).

### • printInfo
To print `Rollup` plugin information from the store.

### • storeAliases
To store the [aliases](https://www.npmjs.com/package/@mnrendra/types-aliases) from `tsconfig.json` into the store.

### • disableOnwarn
To disable `Rollup` warning logs.<BR/>
<I>
If you want to add any warning code enums as reserved enums and avoid adding your own generics, please feel free to request them [here](https://github.com/mnrendra/rollup-utils/issues). We will add them officially as soon as possible. Thank you!
</i>

## Types
```typescript
import type {
  // store
  Store,
  // aliases
  Aliases,
  // onwarn
  WarnCodeEum,
  WarnCodeGeneric,
  WarnCode,
  WarningHandlerWithDefault,
  RollupLog,
  LoggingFunction
} from '@mnrendra/rollup-utils'
```

## License
[MIT](https://github.com/mnrendra/rollup-utils/blob/HEAD/LICENSE)

## Author
[@mnrendra](https://github.com/mnrendra)
