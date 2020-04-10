import { Injectable } from '@nestjs/common';

import { RepositoryInterface } from './base-repository.interface';
import { ServiceInterface } from './service.interface';

@Injectable()
export class Service<
  K, //dto
  T, //local entity
  S extends RepositoryInterface<T, P, K, I>, // Repository of local entity
  P, //paginator
  I //external entity
> implements ServiceInterface<T, P, K> {
  constructor(protected repo: S) {}

  public async updateOne(id: P, obj: K): Promise<T> {
    return await this.repo.updateOne(id, obj);
  }

  public async getOne(id: P): Promise<T> {
    return await this.repo.getById(id);
  }

  public async createOne(body: K, i?: I): Promise<T> {
    return await this.repo.createOne(body, i);
  }

  public async getMany(page: P): Promise<Array<T>> {
    return await this.repo.index(page);
  }

  public async modifyOne(id: P, body: K): Promise<T> {
    return await this.repo.updateOne(id, body);
  }

  public async deleteOne(id: P): Promise<void> {
    return await this.repo.deleteOne(id);
  }
}
