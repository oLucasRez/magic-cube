export function deepCopy<ObjectType>(object: ObjectType): ObjectType {
  const objectCopy = JSON.parse(JSON.stringify(object));

  return objectCopy;
}
