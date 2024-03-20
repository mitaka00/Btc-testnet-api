import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlockTransactionsModule } from './block_transactions/block_transactions.module';
import { RequestStatsModule } from './request_stats/request_stats.module';
import { RequestStat } from './request_stats/request_stat.entity';
import { BlockTransaction } from './block_transactions/block_transaction.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './tasks/tasks.service';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisService } from './redis/redis.service';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      entities: [BlockTransaction, RequestStat],
      synchronize: true,
      database: 'btc_testnet_db',
      username: 'postgres',
      password: 'postgres',
      logging: true,
    }),
    ScheduleModule.forRoot(),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    }),
    BlockTransactionsModule,
    RequestStatsModule,
  ],
  controllers: [AppController],
  providers: [AppService, TasksService, RedisService],
})
export class AppModule {}
