// throttler.config.ts
import { ThrottlerModuleOptions } from '@nestjs/throttler';

export const throttlerConfig: ThrottlerModuleOptions = {
  ttl: 60,
  limit: 60,
};
