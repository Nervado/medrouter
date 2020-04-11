export interface ServiceInterface<T, I, D, O> {
  getMany(page: I): Promise<Array<T>>;

  getOne(id: I): Promise<T>;

  createOne(body: D): Promise<T>;

  updateOne(id: I, body: D): Promise<T>;

  modifyOne(id: I, body: D, o?: O): Promise<T>;

  deleteOne(id: I): Promise<void>;
}

/**
 *
 * T local base entinty
 * I number
 *
 * D ojb to create
 * R : resource to update
 * K : property to change
 */
