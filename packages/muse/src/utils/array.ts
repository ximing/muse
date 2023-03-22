/**
 * A specialized version of `.forEach` for arrays without support for callback
 * shorthands and `this` binding.
 *
 * {@link https://github.com/lodash/lodash/blob/master/lodash.js}.
 *
 * @param {Array|*} array The array to iterate over or an any element with implemented iterator protocol.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
export function arrayEach<T = unknown>(
  array: T[],
  iteratee: (value: T, index: number, iterable: T[]) => any,
) {
  let index = 0;
  let iterable = array;

  if (!Array.isArray(array)) {
    iterable = Array.from(array);
  }

  const { length } = iterable;

  while (index < length) {
    if (iteratee(iterable[index], index, iterable) === false) {
      break;
    }

    index += 1;
  }

  return array;
}
