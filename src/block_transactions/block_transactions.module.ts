import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockTransactionsService } from './block_transactions.service';
import { BlockTransactionsController } from './block_transactions.controller';
import { BlockTransaction } from './block_transaction.entity';
import { RequestStatsModule } from '../request_stats/request_stats.module';

@Module({
  imports: [TypeOrmModule.forFeature([BlockTransaction]), RequestStatsModule],
  controllers: [BlockTransactionsController],
  providers: [BlockTransactionsService],
  exports: [BlockTransactionsService],
})
export class BlockTransactionsModule {}
