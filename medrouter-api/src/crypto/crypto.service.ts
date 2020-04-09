import { Injectable } from '@nestjs/common';
import { extname } from 'path';

import { RandomStringService } from '@akanass/nestjsx-crypto';

@Injectable()
export class CryptoService {
  constructor(
    private readonly _randomStringService: RandomStringService = new RandomStringService(),
  ) {}

  generateFileName(req, file, cb) {
    console.log(req.headers);
    let s;
    this._randomStringService
      .generate({
        length: 32,
        charset: 'hex',
      })
      .subscribe(
        (_s: string) => (s = _s),
        e => console.error(e.message),
      );
    return cb(null, `${s}${extname(file.originalname)}`);
  }
}

export const cryptoService = new CryptoService();
