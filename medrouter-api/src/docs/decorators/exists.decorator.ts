import { SetMetadata } from '@nestjs/common';

export const Exists = (...exists: string[]) => SetMetadata('exists', exists);
