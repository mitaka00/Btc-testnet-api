import { Test, TestingModule } from '@nestjs/testing';
import { RequestStatsService } from './request_stats.service';
import { RequestStat } from './request_stat.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('RequestStatsService', () => {
  let service: RequestStatsService;
  let repo: Repository<RequestStat>;
  let requestRepositoryToken: string | Function =
    getRepositoryToken(RequestStat);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RequestStatsService,
        { provide: requestRepositoryToken, useClass: Repository },
      ],
    }).compile();

    service = module.get<RequestStatsService>(RequestStatsService);
    repo = module.get<Repository<RequestStat>>(requestRepositoryToken);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('SAVE NEW REQUEST', () => {
    it('Should save new request successfully', () => {
      jest.spyOn(repo, 'create').mockReturnValue({} as any);
      jest.spyOn(repo, 'save').mockResolvedValue({} as any);

      service.addRequest({
        ip: 'ip123',
        headers: { 'users-agent': 'vscode' },
      } as any);

      expect(repo.create).toHaveBeenCalledTimes(1);
      expect(repo.save).toHaveBeenCalledTimes(1);
    });
  });
});
