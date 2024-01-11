import { BullModule } from '@nestjs/bull';
import { Module, NestModule } from '@nestjs/common';
import { JobQueueProvider } from './job.provider';
import { JobProcessor } from './job.processor';

@Module({
  imports: [
    BullModule.forRootAsync({ useClass: JobQueueProvider }),
    BullModule.registerQueue({
      name: 'checking-data',
    }),
  ],
  providers: [JobProcessor],
  exports: [BullModule],
})
export class JobModule {}
