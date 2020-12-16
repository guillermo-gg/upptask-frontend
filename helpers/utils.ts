export function insertInArray<T>(item: T, index: number, array: T[]): T[] {
  const updatedArray = [...array];
  updatedArray.splice(index, 0, item);
  return updatedArray;
}
