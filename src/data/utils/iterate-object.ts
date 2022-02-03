export function iterateObject<
  KeyType extends string | number | symbol,
  ValueType,
  ReturnType
>(
  object: Record<KeyType, ValueType>,
  callback: (payload: [KeyType, ValueType]) => ReturnType
) {
  const _return: ReturnType[] = [];

  Object.entries<ValueType>(object).map(([key, value]) =>
    _return.push(callback([key as KeyType, value]))
  );

  return _return;
}
