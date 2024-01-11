import {
  BullRootModuleOptions,
  SharedBullConfigurationFactory,
} from '@nestjs/bull';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JobQueueProvider implements SharedBullConfigurationFactory {
  createSharedConfiguration():
    | BullRootModuleOptions
    | Promise<BullRootModuleOptions> {
    return {
      redis: {
        host: 'localhost',
        port: 6379,
      },
      prefix: 'bull-queue',
      defaultJobOptions: {
        attempts: 3,
        removeOnComplete: false,
        backoff: {
          type: 'exponential',
          // delay: 5000,
        },
      },
    } as any;
  }
}
