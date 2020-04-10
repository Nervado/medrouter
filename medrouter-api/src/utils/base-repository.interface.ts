export interface RepositoryInterface<T, I, D, R> {
  index(page: I): Promise<Array<T>>;
  getById(id: I): Promise<T>;
  createOne(data: D, r?: R): Promise<T>;
  updateOne(id: I, data: D): Promise<T>;
  deleteOne(id: I): void;
}
