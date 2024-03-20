import { Test, TestingModule } from '@nestjs/testing';
import { RedisService } from './redis.service';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('RedisService', () => {
  let service: RedisService;
  let cacheManager: Cache;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RedisService,
        {
          provide: CACHE_MANAGER,
          useValue: {
            set: jest.fn(),
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RedisService>(RedisService);
    cacheManager = module.get<Cache>(CACHE_MANAGER);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should save data in Redis', async () => {
    await service.saveDataInRedis('cache', 'cache123');

    expect(cacheManager.set).toHaveBeenCalledWith('cache', 'cache123');
  });

  it('should get data from Redis', async () => {
    (
      cacheManager.get as jest.MockedFunction<typeof cacheManager.get>
    ).mockResolvedValueOnce('cache123');
    const result = await service.getDataFromRedis('cache');
    expect(result).toEqual('cache123');
  });
});
