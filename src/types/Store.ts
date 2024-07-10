import type { Aliases } from '.'

export interface Store {
  name: string
  pluginName: string
  version: string
  homepage: string
  aliases: Aliases
}
