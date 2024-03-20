import { Injectable } from '@nestjs/common';
import { BlockTransactionsService } from '../block_transactions/block_transactions.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class TasksService {
  constructor(
    private transactionsService: BlockTransactionsService,
    private redis: RedisService,
  ) {}

  @Cron('*/2 * * * *')
  async handleCron() {
    const lastBlock = await this.transactionsService.getLastBlock();
    const redisHash = await this.redis.getDataFromRedis('hash');

    if (redisHash !== lastBlock.hash) {
      this.redis.saveDataInRedis('hash', lastBlock.hash);
      this.transactionsService.saveAllNewTransactions(lastBlock.hash);
    }
  }
}
