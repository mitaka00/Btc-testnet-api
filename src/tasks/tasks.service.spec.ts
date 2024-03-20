import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { RedisService } from '../redis/redis.service';
import { BlockTransactionsService } from '../block_transactions/block_transactions.service';

describe('TasksService', () => {
  let service: TasksService;
  let _redisService: Partial<RedisService>;
  let _transactionService: Partial<BlockTransactionsService>;

  beforeEach(async () => {
    _redisService = {
      saveDataInRedis: jest.fn(() => Promise.resolve()),
      getDataFromRedis: jest.fn(() => Promise.resolve('hash123')),
    };

    _transactionService = {
      getLastBlock: jest.fn(() =>
        Promise.resolve({ hash: 'hash123', height: 23 }),
      ),
      saveAllNewTransactions: jest.fn(() => Promise.resolve()),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: RedisService,
          useValue: _redisService,
        },
        {
          provide: BlockTransactionsService,
          useValue: _transactionService,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should handle task request without saving new hash', async () => {
    await service.handleCron();

    expect(_redisService.saveDataInRedis).toHaveBeenCalledTimes(0);
  });

  it('should handle task request and save the new hash', async () => {
    _transactionService.getLastBlock = jest.fn(() =>
      Promise.resolve({ hash: 'other123', height: 23 }),
    );

    await service.handleCron();

    expect(_redisService.saveDataInRedis).toHaveBeenCalledTimes(1);
  });
});
