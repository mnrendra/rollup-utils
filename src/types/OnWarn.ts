import type { LoggingFunction } from 'rollup'

import type { WARN_LOG, WARN_LOG_DEF } from '../consts'

export type {
  WarningHandlerWithDefault,
  RollupLog,
  LoggingFunction
} from 'rollup'

type ExtractArrayType<T> = T extends [infer U] ? U : T

export type LogParams = Parameters<LoggingFunction>

export type LogParam = ExtractArrayType<LogParams>

export type LogReturn = ReturnType<LoggingFunction>

export type WarnCodeEnum = keyof typeof WARN_LOG

type WarnCodeEnumGeneric<Code = WarnCodeEnum> =
| WarnCodeEnum
| Code

export type WarnCodeGeneric =
| WarnCodeEnum
| string

export type WarnCode<Code extends WarnCodeGeneric = typeof WARN_LOG_DEF> =
| WarnCodeEnumGeneric<Code>
| Array<WarnCodeEnumGeneric<Code>>
