import { z } from "zod";

export namespace parser {
  export function flag(s: string): boolean {
    return s.length !== 0 && s.toLowerCase() !== "false";
  }

  export function intDec(s: string): number {
    return parseInt(s, 10);
  }

  export function port(s: string): number {
    return z
      .number()
      .min(0)
      .max(2 ** 16 - 1)
      .parse(intDec(s));
  }
}
