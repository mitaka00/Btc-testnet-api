import { Controller, Post, Get, Param, Req } from '@nestjs/common';
import { BlockTransactionsService } from './block_transactions.service';
import { RequestStatsService } from '../request_stats/request_stats.service';
import { Request } from 'express';

@Controller('block')
export class BlockTransactionsController {
  constructor(
    private transactionsService: BlockTransactionsService,
    private requetsService: RequestStatsService,
  ) {}

  @Get('/lastBlock')
  async getLastBlock(@Req() req: Request) {
    const data = await this.transactionsService.getLastBlock();
    await this.requetsService.addRequest(req);

    return data;
  }

  @Get('/transaction/:hash')
  async getTransaction(@Param('hash') hash: string, @Req() req: Request) {
    const data = await this.transactionsService.getTransaction(hash);
    await this.requetsService.addRequest(req);

    return data;
  }
}
