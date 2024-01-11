import { Controller, Get, Injectable, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { QueueService } from 'src/job/queue.service';

@Controller('/api/test')
export class PublicController {
  constructor(private queueService: QueueService) {}
  @Get()
  async findAll(@Req() req: Request, @Res() res: Response): Promise<any> {
    let data = {
      name: 'testing ' + new Date().getTime(),
    };

    let jobadd = await this.queueService.addJobData(data);

    await jobadd.finished();

    return res.status(200).send({
      status: 'OK',
    });
  }
}
