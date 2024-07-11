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
  aliases: [] // `@mnrendra/tsconfig-alias-parser` value
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
  onwarn: disableOnwarn() // To disable Rollup warning logs. ex: 'MIXED_EXPORTS' warning log.
}
```

## Utilities

### • initStore
To initialize the `store` to save the expensive data (e.g., `package.json` values).
```typescript
import type { Store } from '@mnrendra/rollup-utils'

type InitStore = (store: Store) => Promise<void>
```
It will automatically read `package.json` and store the required properties in the `store`.

### • printInfo
To print `Rollup` plugin information from the `store`.
```typescript
import type { Store } from '@mnrendra/rollup-utils'

type PrintInfo = (store: Store) => void
```
The current format is: `• pluginName: version`. If you wish to change the format, please request it [here](https://github.com/mnrendra/rollup-utils/issues).

### • storeAliases
To store the [aliases](https://www.npmjs.com/package/@mnrendra/types-aliases) from `tsconfig.json` in the `store`.
```typescript
import type { Store } from '@mnrendra/rollup-utils'

type StoreAliases = (store: Store) => Promise<void>
```
It will automatically parse the `baseUrl` and `paths` from `tsconfig.json` into [aliases](https://www.npmjs.com/package/@mnrendra/types-aliases) using [@mnrendra/tsconfig-alias-parser](https://www.npmjs.com/package/@mnrendra/tsconfig-alias-parser), store them in the `store`, and make them available for use by alias resolver plugins, such as [@mnrendra/rollup-plugin-alias](https://www.npmjs.com/package/@mnrendra/rollup-plugin-alias).

### • disableOnwarn
To disable `Rollup` warning logs.
```typescript
import type { WarningHandlerWithDefault } from 'rollup'
import type { WarnCode } from '@mnrendra/rollup-utils'

type DisableOnwarn = <T>(warnCode: WarnCode<T> = 'MIXED_EXPORTS') => WarningHandlerWithDefault
```
If you wish to add any warning code enums as reserved enums and avoid adding your own generics, please feel free to request them [here](https://github.com/mnrendra/rollup-utils/issues). We will add them officially as soon as possible. Thank you!

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
