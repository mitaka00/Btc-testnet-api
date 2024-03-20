import { Module } from '@nestjs/common';
import { RequestStatsService } from './request_stats.service';
import { RequestStat } from './request_stat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [RequestStatsService],
  imports: [TypeOrmModule.forFeature([RequestStat])],
  exports: [RequestStatsService],
})
export class RequestStatsModule {}
