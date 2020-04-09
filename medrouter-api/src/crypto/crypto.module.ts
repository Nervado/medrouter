import { Module } from '@nestjs/common';
import { CryptoModule } from '@akanass/nestjsx-crypto';
import { CryptoService } from './crypto.service';

@Module({
  imports: [
    CryptoModule, // if you want to change openssl path you have to call `.setConfig({ pem: { pathOpenSSL: '/path/to/openssl' } })` when importing
  ],
  providers: [CryptoService],
})
export class CryptoNestModule {}
