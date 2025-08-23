
export function buildUpdateData<T extends object>(dto: Partial<T>): Partial<T> {
  return Object.fromEntries(
    Object.entries(dto).filter(([_, v]) => v !== undefined && v !== null)
  ) as Partial<T>;
}
