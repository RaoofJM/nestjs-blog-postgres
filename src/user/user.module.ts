import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { UserRepository } from './user.repository';

@Module({
  providers: [UserRepository],
  imports: [PrismaModule],
  exports: [UserRepository],
})
export class UserModule {}
