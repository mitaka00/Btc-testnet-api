import { Test, TestingModule } from '@nestjs/testing';
import { BlockTransactionsService } from './block_transactions.service';
import { BlockTransaction } from './block_transaction.entity';
import axios from 'axios';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FromBtcToSatoshi } from './../common/btcConverter';

jest.mock('axios');

describe('BlockTransactionsService', () => {
  let service: BlockTransactionsService;
  let repo: Repository<BlockTransaction>;
  let blockTransactionRepositoryToken: string | Function =
    getRepositoryToken(BlockTransaction);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlockTransactionsService,
        { provide: blockTransactionRepositoryToken, useClass: Repository },
      ],
    }).compile();

    service = module.get<BlockTransactionsService>(BlockTransactionsService);
    repo = module.get<Repository<BlockTransaction>>(
      blockTransactionRepositoryToken,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //LAST BLOCK TEST
  describe('GET LAST BLOCK TEST', () => {
    it('should get last block successfully', async () => {
      const mockData = {
        height: 23,
        hash: 'dasd',
      };

      jest.spyOn(axios, 'get').mockResolvedValue({
        data: {
          blocks: 23,
          bestblockhash: 'dasd',
        },
      });
      const result = await service.getLastBlock();
      expect(result).toEqual(mockData);
    });
  });

  //GET TRANSACTION BY HASH
  describe('GET TRANSACTION BY HASH', () => {
    it('should get transaction successfully', async () => {
      const resultData = {
        transactionHash: 'hash123',
        sender: 'sender1',
        receiver: 'receiver1',
        amountSent: 1,
      };

      jest.spyOn(axios, 'get').mockResolvedValue({
        data: {
          hash: 23,
          inputs: [
            {
              coin: {
                address: 'sender1',
              },
            },
          ],
          outputs: [
            {
              address: 'receiver1',
              value: FromBtcToSatoshi(1),
            },
          ],
        },
      });
      const result = await service.getTransaction('hash123');
      expect(result).toEqual(resultData);
    });
  });

  //SAVE ALL NEW TRANSACTIONS
  describe('SAVE ALL NEW TRANSACTIONS', () => {
    it('should save transactions successfully', async () => {
      const resultData = {
        blockHeight: 23,
        transactionHash: 'hash123',
        sender: 'sender1',
        receiver: 'receiver1',
        amountSent: 1,
      };

      const axiosMockData = {
        data: {
          txs: [
            {
              hash: 'hash123',
              inputs: [
                {
                  coin: {
                    address: 'sender1',
                  },
                },
              ],
              outputs: [
                {
                  address: 'receiver1',
                  value: FromBtcToSatoshi(1),
                },
              ],
            },
            {
              hash: 'hash123',
              inputs: [{}],
              outputs: [
                {
                  address: 'receiver1',
                  value: FromBtcToSatoshi(1),
                },
              ],
            },
          ],
        },
      };

      jest.spyOn(axios, 'get').mockResolvedValue(axiosMockData);

      jest.spyOn(repo, 'create').mockReturnValue({} as any);
      jest.spyOn(repo, 'save').mockResolvedValue({} as any);

      const result = await service.saveAllNewTransactions('blockHash123');

      expect(repo.create).toHaveBeenCalledTimes(1);
      expect(repo.save).toHaveBeenCalledTimes(1);
    });
  });
});
