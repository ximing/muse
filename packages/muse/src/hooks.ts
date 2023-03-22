import { arrayEach } from './utils/array';
import { fastCall } from './utils/function';
import { objectEach } from './utils/object';
import { VIEW_RENDER } from './contants';

const REGISTERED_HOOKS: string[] = [VIEW_RENDER];

export class Hooks {
  bucket!: Map<string, any[]>;

  constructor() {
    this.bucket = this.createEmptyBucket();
  }

  /**
   * 返回一个新对象，其中包含与每个已注册的挂钩名称相关的空处理程序。
   * @example
   * ```js
   * {
   * ...
   * beforeInit: [],
   * ...
   * }
   * ```
   */
  createEmptyBucket() {
    const bucket: any = new Map();

    arrayEach(REGISTERED_HOOKS, (hook) => bucket.set(hook, []));

    return bucket;
  }

  /**
   * 根据对象的上下文获取钩子桶，或者如果参数为“undefined”，则获取全局钩子桶。
   */
  getBucket(): Map<string, any[]> {
    return this.bucket;
  }

  /**
   * 将侦听器（全局或本地）添加到指定的Hook名称。
   * 如果提供了 `context` 参数，钩子将只添加到它引用的实例中。
   * 否则，每次在任何 SmartTable 实例上触发钩子时都会使用回调。
   * 可以提供一组回调函数作为 `callback` 参数，这样一旦钩子被触发，它们就会全部被触发。
   * @example
   * ```js
   * // single callback, added locally
   * hooks.add('beforeInit', myCallback, hotInstance);
   *
   * // single callback, added globally
   * hooks.add('beforeInit', myCallback);
   *
   * // multiple callbacks, added locally
   * hooks.add('beforeInit', [myCallback, anotherCallback], hotInstance);
   *
   * // multiple callbacks, added globally
   * hooks.add('beforeInit', [myCallback, anotherCallback]);
   * ```
   */
  add(key: string, callback: any) {
    if (Array.isArray(callback)) {
      arrayEach(callback, (c) => this.add(key, c));
    } else {
      const bucket = this.getBucket();

      if (typeof bucket.get(key) === 'undefined') {
        this.register(key);
        bucket.set(key, []);
      }
      callback.skip = false;
      const hooks = bucket.get(key)!;
      if (hooks.indexOf(callback) === -1) {
        // 仅在尚未添加挂钩时添加挂钩（现在将忽略两次添加相同的挂钩）
        let foundInitialHook = false;

        if (callback.initialHook) {
          // eslint-disable-next-line consistent-return
          arrayEach(bucket.get(key)!, (cb, i) => {
            if (cb.initialHook) {
              hooks[i] = callback;
              foundInitialHook = true;
              return false;
            }
          });
        }
        if (!foundInitialHook) {
          hooks.push(callback);
        }
      }
    }

    return this;
  }

  /**
   * 将侦听器添加到指定的Hook。Hook运行后，此侦听器将自动从存储桶中删除。
   * @example
   * ```js
   * hooks.once('beforeInit', myCallback, hotInstance);
   * ```
   */
  once(key: string, callback: any) {
    if (Array.isArray(callback)) {
      arrayEach(callback, (c) => this.once(key, c));
    } else {
      callback.runOnce = true;
      this.add(key, callback);
    }
  }

  /**
   * 从具有给定名称的Hook中删除listener。如果提供了 context 参数，它会从分配给给定 SmartTable 实例的本地挂钩中删除一个侦听器。
   * @example
   * ```js
   * Handsontable.hooks.remove('beforeInit', myCallback);
   * ```
   */
  remove(key: string, callback: any) {
    const bucket = this.getBucket();
    const hooks = bucket.get(key);
    if (typeof hooks !== 'undefined') {
      if (hooks.indexOf(callback) >= 0) {
        callback.skip = true;
        return true;
      }
    }

    return false;
  }

  /**
   * 检查提供的Hook名称是否有任何已注册的Listener。
   */
  has(key: string) {
    const bucket = this.getBucket();
    return bucket.get(key)?.length;
  }

  /**
   * 运行分配给由“key”参数标识的Hooks 所有本地和全局回调。
   * 它返回上次调用的回调的返回值或传递给 run 函数的第一个参数 (p1)。
   * @example
   * ```js
   * Handsontable.hooks.run(hot, 'beforeInit');
   * ```
   */
  run(
    context: any,
    key: string,
    p1?: any,
    p2?: any,
    p3?: any,
    p4?: any,
    p5?: any,
    p6?: any
  ) {
    {
      const localHandlers = this.getBucket().get(key)!;
      const length = localHandlers ? localHandlers.length : 0;
      let index = 0;

      if (length) {
        // Do not optimise this loop with arrayEach or arrow function! If you do You'll decrease perf because of GC.
        while (index < length) {
          if (!localHandlers[index] || localHandlers[index].skip) {
            index += 1;
            continue;
          }

          const res = fastCall(
            localHandlers[index],
            context,
            p1,
            p2,
            p3,
            p4,
            p5,
            p6
          );

          if (res !== undefined) {
            // eslint-disable-next-line no-param-reassign
            p1 = res;
          }
          if (localHandlers[index]?.runOnce) {
            this.remove(key, localHandlers[index]);
          }

          index += 1;
        }
      }
    }

    return p1;
  }

  /**
   * 销毁连接到上下文的所有listener。如果没有提供上下文，全局侦听器将被销毁。
   */
  destroy() {
    objectEach(
      this.getBucket(),
      (value, key, bucket) => (bucket[key].length = 0)
    );
  }

  /**
   * 注册一个挂钩名称（将其添加到已知挂钩名称列表中）。由插件使用。
   * 调用 register 不是必须的，但如果你使用它，你的plugin hook 将被 `getRegistered` 方法返回。
   */
  register(key: string) {
    if (!this.isRegistered(key)) {
      REGISTERED_HOOKS.push(key);
    }
  }

  /**
   * 注销挂钩名称（将其从已知挂钩名称列表中删除）
   */
  deregister(key: string) {
    if (this.isRegistered(key)) {
      REGISTERED_HOOKS.splice(REGISTERED_HOOKS.indexOf(key), 1);
    }
  }

  /**
   * 返回一个布尔值，具体取决于是否已注册此类名称的钩子。
   */
  isRegistered(hookName: string) {
    return REGISTERED_HOOKS.indexOf(hookName) >= 0;
  }

  /**
   * 返回一组已注册的钩子
   *
   * @example
   * ```js
   * [
   * ...
   *   'beforeInit',
   *   'beforeRender',
   *   'beforeSetRangeEnd',
   *   'beforeDrawBorders',
   *   'beforeChange',
   * ...
   * ]
   * ```
   */
  getRegistered() {
    return REGISTERED_HOOKS;
  }
}
