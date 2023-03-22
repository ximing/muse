export type Numeric = number | string;

export function isString(o: unknown): o is string {
  return typeof o === 'string';
}

export function isDefined(variable: unknown) {
  return typeof variable !== 'undefined';
}

export function isUndefined(o: unknown): o is undefined {
  return typeof o === 'undefined';
}

export function isNull(o: unknown): o is null {
  return o === null;
}

export const isEmpty = (value: any) =>
  value === void 0 || value === null || value === '';

export function isObject<T>(o: unknown): o is T {
  return o !== null && typeof o === 'object';
}

export function isBoolean(o: unknown): o is boolean {
  return o === true || o === false;
}

export function isFunction(o: unknown): o is (...args: any[]) => any {
  return typeof o === 'function';
}

export function isNumber(o: unknown): o is number {
  return typeof o === 'number';
}

export function isBooleanStringLiteral(o: unknown): o is string {
  return o === 'true' || o === 'false';
}

export const isArray = Array.isArray;

export const isDef = <T>(val: T): val is NonNullable<T> =>
  val !== undefined && val !== null;

export const isNumeric = (val: Numeric): val is string =>
  typeof val === 'number' || /^\d+(\.\d+)?$/.test(val);
