import { Injectable } from '@nestjs/common';
import { RequestStat } from './request_stat.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';

@Injectable()
export class RequestStatsService {
  constructor(
    @InjectRepository(RequestStat)
    private repoRequests: Repository<RequestStat>,
  ) {}

  async addRequest(req: Request) {
    const userAgent = req.headers['user-agent'];
    const ip = req.ip;

    const reqToken = this.repoRequests.create({ ip, userAgent });
    this.repoRequests.save(reqToken);

    return reqToken;
  }
}
