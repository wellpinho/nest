import { Global, Module } from '@nestjs/common';
import { HashingServiceProtocol } from './hashing/hasging.service';
import { BcryptService } from './hashing/bcryptService';

@Global()
@Module({
  providers: [
    {
      provide: HashingServiceProtocol,
      useClass: BcryptService,
    },
  ],
  exports: [HashingServiceProtocol],
})
export class AuthModule {}
