export function iterateObject<
  KeyType extends string | number | symbol,
  ValueType
>(
  object: Record<KeyType, ValueType>,
  callback: (payload: [KeyType, ValueType]) => void
) {
  Object.entries<ValueType>(object).map(([key, value]) =>
    callback([key as KeyType, value])
  );
}
