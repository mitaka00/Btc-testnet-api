import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async saveDataInRedis(key: string, value: string) {
    await this.cacheManager.set(key, value);
  }

  async getDataFromRedis(key: string) {
    const value = await this.cacheManager.get(key);
    return value;
  }
}
