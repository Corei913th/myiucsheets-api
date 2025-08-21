

export abstract class BaseService<T> {
  abstract getAll(): Promise<T[]>
  abstract getById(id: string): Promise<T | null>
  abstract create(data: any): Promise<T>
  abstract update(id: string, data: any): Promise<T>
  abstract delete(id: string): Promise<void>
}
