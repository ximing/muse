import { isDefined } from './is';

/**
 * Calls a function in the quickest way available.
 *
 * In contrast to the `apply()` method that passes arguments as an array,
 * the `call()` method passes arguments directly, to avoid garbage collection costs.
 *
 * @param {Function} func The function to call.
 * @param {*} context The value to use as `this` when calling the `func` function.
 * @param {*} [arg1] An argument passed to the `func` function.
 * @param {*} [arg2] An argument passed to `func` function.
 * @param {*} [arg3] An argument passed to `func` function.
 * @param {*} [arg4] An argument passed to `func` function.
 * @param {*} [arg5] An argument passed to `func` function.
 * @param {*} [arg6] An argument passed to `func` function.
 * @returns {*}
 */
export function fastCall(
  func: any,
  context: any,
  arg1: any,
  arg2: any,
  arg3: any,
  arg4: any,
  arg5: any,
  arg6: any,
) {
  if (isDefined(arg6)) {
    return func.call(context, arg1, arg2, arg3, arg4, arg5, arg6);
  } else if (isDefined(arg5)) {
    return func.call(context, arg1, arg2, arg3, arg4, arg5);
  } else if (isDefined(arg4)) {
    return func.call(context, arg1, arg2, arg3, arg4);
  } else if (isDefined(arg3)) {
    return func.call(context, arg1, arg2, arg3);
  } else if (isDefined(arg2)) {
    return func.call(context, arg1, arg2);
  } else if (isDefined(arg1)) {
    return func.call(context, arg1);
  }
  return func.call(context);
}

export function throttle(func: any, wait = 200) {
  let lastCalled = 0;
  const result = {
    lastCallThrottled: true,
  };
  let lastTimer: number | null = null;

  /**
   * @param {...*} args The list of arguments passed during the function invocation.
   * @returns {object}
   */
  function _throttle(this: any, ...args: any[]) {
    const stamp = Date.now();
    let needCall = false;

    result.lastCallThrottled = true;

    if (!lastCalled) {
      lastCalled = stamp;
      needCall = true;
    }
    const remaining = wait - (stamp - lastCalled);

    if (needCall) {
      result.lastCallThrottled = false;
      // eslint-disable-next-line @babel/no-invalid-this
      func.apply(this, args);
    } else {
      if (lastTimer) {
        clearTimeout(lastTimer);
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      lastTimer = setTimeout(() => {
        result.lastCallThrottled = false;
        // eslint-disable-next-line @babel/no-invalid-this
        func.apply(this, args);
        lastCalled = 0;
        lastTimer = null;
      }, remaining);
    }

    return result;
  }

  return _throttle;
}

export function debounce(func: any, wait = 200) {
  let lastTimer: number | null = null;
  let result: any;

  /**
   * @param {*} args The list of arguments passed during the function invocation.
   * @returns {*}
   */
  function _debounce(this: any, ...args: any[]) {
    if (lastTimer) {
      clearTimeout(lastTimer);
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    lastTimer = setTimeout(() => {
      // eslint-disable-next-line @babel/no-invalid-this
      result = func.apply(this, args);
    }, wait);

    return result;
  }

  return _debounce;
}
