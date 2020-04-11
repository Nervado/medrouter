export interface RepositoryInterface<T, I, D, R, O> {
  index(page: I): Promise<Array<T>>;
  getById(id: I): Promise<T>;
  createOne(data: D, r?: R): Promise<T>;
  updateOne(id: I, data: D, o?: O): Promise<T>;
  softDelete({ id: I }): void;
}
