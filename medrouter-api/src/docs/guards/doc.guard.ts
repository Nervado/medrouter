import {
  Injectable,
  ExecutionContext,
  CanActivate,
  BadRequestException,
} from '@nestjs/common';

import { DocRepository } from '../doc.repository';
import { Reflector } from '@nestjs/core';

@Injectable()
export class DocGuard implements CanActivate {
  constructor(private reflector: Reflector, private docRepo: DocRepository) {}

  canActivate(context: ExecutionContext): Promise<boolean> | boolean {
    const exists = this.reflector.get<string[]>('exists', context.getHandler());
    const genericParam = context.switchToHttp().getRequest().params;

    if (!exists) {
      return true;
    }

    if (Object.keys(genericParam)[0] !== Object.values(exists)[0]) {
      return false;
    }

    return this.fileExists(genericParam[exists[0]]);
  }

  async fileExists(filename: string): Promise<boolean> {
    const result = await this.docRepo.findOne({
      where: { filename: filename },
    });

    if (!result) {
      throw new BadRequestException('Document not found!');
    }

    return result ? true : false;
  }
}
