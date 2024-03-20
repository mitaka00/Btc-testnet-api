import { Test, TestingModule } from '@nestjs/testing';
import { BlockTransactionsController } from './block_transactions.controller';
import { BlockTransactionsService } from './block_transactions.service';
import { RequestStatsService } from '../request_stats/request_stats.service';
import { RequestStat } from '../request_stats/request_stat.entity';
import { Repository } from 'typeorm';
import { BlockTransaction } from './block_transaction.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import axios from 'axios';
import { RequestStatsModule } from '../request_stats/request_stats.module';

describe('BlockTransactionsController', () => {
  let controller: BlockTransactionsController;
  /*
  let service: BlockTransactionsService;
  let transactionRepo: Repository<BlockTransaction>;
  let blockTransactionRepositoryToken: string | Function =
    getRepositoryToken(BlockTransaction);
  let requestRepo: Repository<RequestStat>;
  let requestRepositoryToken: string | Function =
    getRepositoryToken(BlockTransaction);
    */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlockTransactionsController],
      providers: [
        BlockTransactionsService,
        /*
        { provide: blockTransactionRepositoryToken, useClass: Repository },
        { provide: requestRepositoryToken, useClass: Repository },
        */
      ],
    }).compile();

    /*
    controller = module.get<BlockTransactionsController>(
      BlockTransactionsController,
    );

    transactionRepo = module.get<Repository<BlockTransaction>>(
      blockTransactionRepositoryToken,
    );

    requestRepo = module.get<Repository<RequestStat>>(requestRepositoryToken);
    */
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET LAST BLOCK', () => {
    /*
    it('should get last block successfully', async () => {
      jest.spyOn(axios, 'get').mockResolvedValue({
        data: {
          blocks: 23,
          bestblockhash: 'dasd',
        },
      });

      const result = await controller.getLastBlock({
        ip: 'ip123',
        headers: { 'user-agent': 'vscode' },
      } as any);

      expect(result).toBeDefined();

      const added = requestRepo.find({ where: { ip: 'ip123' } });
      console.log(added);
      expect(added).toBeDefined();
    });
    */
  });
});
