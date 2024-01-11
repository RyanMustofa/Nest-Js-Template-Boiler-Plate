import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class QueueService {
  constructor(@InjectQueue('checking-data') private jobQueue: Queue) {}

  async addJobData(data: any): Promise<any> {
    let rjob = await this.jobQueue.add('data', {
      data_queue: data,
    });

    return rjob;
  }
}
