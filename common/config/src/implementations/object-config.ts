import { ConfigMappingError, ConfigMissingError } from "../errors";
import type { Config, ConfigKey } from "../types";

/**
 * Extract configuration from an object like process.env
 * Doesn't work in Next.js because environment variables are handled statically.
 */
export class ObjectConfig<Value = string> implements Config<Value> {
  constructor(
    protected readonly obj: Readonly<Record<ConfigKey, Value | undefined>>
  ) {}

  public has(key: ConfigKey): boolean {
    return key in this.obj;
  }

  public get(
    key: ConfigKey,
    options?: {
      fallback: Value;
      strict?: boolean;
      validate?: (value: unknown) => Value;
    }
  ): Value {
    const validate = options?.validate ?? ((value: Value) => value);
    const fallback = options?.fallback;
    const strict = options?.strict ?? true;
    const result = this.tryParse(key, validate, strict) ?? fallback;
    if (result === undefined) {
      throw new ConfigMissingError(key);
    }
    return result;
  }

  public parse<T>(
    key: ConfigKey,
    parser: (value: Value) => T | undefined,
    options?: { fallback: T; strict?: boolean } // no default implies required
  ): T {
    const fallback = options?.fallback;
    const strict = options?.strict ?? true;
    const result = this.tryParse(key, parser, strict) ?? fallback;
    if (result === undefined) {
      throw new ConfigMissingError(key);
    }
    return result;
  }

  protected tryParse<T>(
    key: ConfigKey,
    parser: (value: Value) => T | undefined,
    strict: boolean
  ): T | undefined {
    const value = this.obj[key];
    if (value === undefined) {
      return undefined;
    }
    try {
      return parser(value);
    } catch (e: unknown) {
      if (strict) {
        console.warn(ConfigMappingError.getMessage(key, value));
        throw e;
      }
      console.warn(ConfigMappingError.getMessage(key, value, e));
      return undefined;
    }
  }
}
