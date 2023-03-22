export function objectEach(
  object: any,
  iteratee: (value: any, key: string, object: any) => any,
) {
  for (const key in object) {
    if (
      !object.hasOwnProperty ||
      (object.hasOwnProperty &&
        Object.prototype.hasOwnProperty.call(object, key))
    ) {
      if (iteratee(object[key], key, object) === false) {
        break;
      }
    }
  }

  return object;
}
