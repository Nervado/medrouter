import { SetMetadata } from '@nestjs/common';

export const Allow = (...allow: string[]) => SetMetadata('allow', allow);
