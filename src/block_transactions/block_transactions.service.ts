import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BlockTransaction } from './block_transaction.entity';
import axios from 'axios';
import { FromSatoshiToBtc } from '../common/btcConverter';
require('dotenv').config();

@Injectable()
export class BlockTransactionsService {
  constructor(
    @InjectRepository(BlockTransaction)
    private repoTransactions: Repository<BlockTransaction>,
  ) {}

  async getLastBlock() {
    const data = await axios.get(`https://api.tatum.io/v3/bitcoin/info`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.TESTNET_API_KEY,
      },
    });

    const result = {
      height: data.data.blocks,
      hash: data.data.bestblockhash,
    };

    return result;
  }

  private async getBlock(hash: string) {
    const data = await axios.get(
      `https://api.tatum.io/v3/bitcoin/block/${hash}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.TESTNET_API_KEY,
        },
      },
    );

    return data;
  }

  async getTransaction(hash: string) {
    const data = await axios.get(
      `https://api.tatum.io/v3/bitcoin/transaction/${hash}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.TESTNET_API_KEY,
        },
      },
    );
    const convertedAmount = FromSatoshiToBtc(data.data.outputs[0].value);
    const result = {
      transactionHash: hash,
      sender: data.data.inputs[0].coin.address || null,
      receiver: data.data.outputs[0].address,
      amountSent: convertedAmount,
    };

    return result;
  }

  async saveAllNewTransactions(hash: string) {
    const data = await this.getBlock(hash);

    for (const tr of data.data.txs) {
      if (tr.inputs[0].coin !== undefined) {
        const convertedAmount = FromSatoshiToBtc(tr.outputs[0].value);

        const result = {
          blockHeight: tr.blockNumber,
          transactionHash: tr.hash,
          sender: tr.inputs[0].coin.address || 'undefined',
          receiver: tr.outputs[0].address || 'undefined',
          amountSent: convertedAmount,
        };

        const reqToken = this.repoTransactions.create(result);
        this.repoTransactions.save(reqToken);
      }
    }
  }
}
