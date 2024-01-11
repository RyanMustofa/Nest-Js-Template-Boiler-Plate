import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('checking-data')
export class JobProcessor {
  constructor() {}

  @Process('data')
  async handleDataJob(job: Job) {
    console.log(job.data);
  }
}
