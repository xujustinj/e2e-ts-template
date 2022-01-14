// It is okay to directly bubble errors up because config errors are internal.

export class ConfigError extends Error {
  constructor(public readonly key: string, message: string) {
    super(message);
  }
}

export class ConfigLookupError extends ConfigError {
  constructor(key: string, public readonly cause?: unknown) {
    super(key, ConfigLookupError.getMessage(key, cause));
  }

  public static getMessage(key: string, cause?: unknown): string {
    return cause === undefined
      ? `Failed to look up config value for config key ${key}.`
      : `Failed to look up config value for config key ${key} due to: ${cause}`;
  }
}

export class ConfigMappingError<ConfigValue> extends ConfigError {
  constructor(
    key: string,
    public readonly value: ConfigValue,
    public readonly cause: unknown
  ) {
    super(key, ConfigMappingError.getMessage(key, value, cause));
  }

  public static getMessage<ConfigValue>(
    key: string,
    value: ConfigValue,
    cause?: unknown
  ): string {
    return cause === undefined
      ? `Failed to process value ${value} for config key ${key}.`
      : `Failed to process value ${value} for config key ${key} due to: ${cause}`;
  }
}

export class ConfigMissingError extends ConfigError {
  constructor(key: string) {
    super(key, `Value missing when expected for config key ${key}.`);
  }
}
