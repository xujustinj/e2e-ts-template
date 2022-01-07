export type ConfigKey = Uppercase<string>;

interface BaseOptions<T> {
  // if no fallback is given, a value must be configured
  fallback: T;
  // if strict, errors thrown by validation/parsing will propagate upward
  // if not strict, all errors will be caught and undefined is returned
  strict?: boolean;
}

export interface Config<Value = string> {
  has(key: ConfigKey): boolean;

  get(
    key: ConfigKey,
    options?: BaseOptions<Value> & {
      validate?: (value: unknown) => Value;
    }
  ): Value;

  parse<T>(
    key: string,
    parser: (value: Value) => T | undefined,
    options?: BaseOptions<T>
  ): T;
}
