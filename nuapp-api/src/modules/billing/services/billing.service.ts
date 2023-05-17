import BillingModel, { Billing } from '../models/billing.model';
import { singleton, container } from 'tsyringe';
import { KardexTransactionService } from './kardex-transaction.service';
import { KardexTransactionType } from '../enums/kardex-transaction-type';
import { BaseService } from '../../../helpers/abstracts/base.service';
import { KardexTransaction } from '../models/kardex-transaction.model';
import { SequencedCodeService } from './sequenced-code.service';
import { ProjectionType } from 'mongoose';
import { DocumentType } from '@typegoose/typegoose';
import { BeAnObject } from '@typegoose/typegoose/lib/types';
import dayjs from 'dayjs';

const kardexTransactionService = container.resolve(KardexTransactionService);
const sequencedCodeService = container.resolve(SequencedCodeService);

@singleton()
export class BillingService extends BaseService<Billing> {
  async findOne(id: string): Promise<Billing | null> {
    return await BillingModel.findById(id).exec();
  }
  async findAll({ page = 1 }): Promise<Billing[]> {
    const bills: Billing[] = await BillingModel.find()
      .skip(10 * (page - 1))
      .limit(10)
      .sort({ createdAt: -1 })
      .exec();
    return bills;
  }
  async findPerDate(
    date: Date,
    projection:
      | ProjectionType<DocumentType<Billing, BeAnObject>>
      | null
      | undefined,
  ): Promise<Billing[]> {
    const startDate = dayjs(date)
      .set('hours', 0)
      .set('minutes', 0)
      .set('seconds', 0)
      .toDate();
    const endDate = dayjs(date)
      .set('hours', 23)
      .set('minutes', 59)
      .set('seconds', 59)
      .toDate();
    const billings: Billing[] = await BillingModel.find(
      {
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },
      },
      projection,
    ).exec();
    return billings;
  }
  async findGreaterThanDate(date: string): Promise<Billing[]> {
    const startDate = dayjs(date)
      .set('hours', 0)
      .set('minutes', 0)
      .set('seconds', 0)
      .toDate();
    const billings: Billing[] = await BillingModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
          },
        },
      },
      {
        $project: {
          createdAt: 1,
          billAmount: 1,
        },
      },
      {
        $addFields: {
          createdAt: {
            $substr: ['$createdAt', 0, 10],
          },
        },
      },
      {
        $group: {
          _id: '$createdAt',
          billAmount: {
            $sum: '$billAmount',
          },
        },
      },
      {
        $addFields: {
          createdAt: {
            $toDate: '$_id',
          },
        },
      },
      {
        $sort: {
          createdAt: 1,
        },
      },
      {
        $project: {
          _id: 0,
          createdAt: '$_id',
          billAmount: 1,
        },
      },
    ]).exec();
    return billings;
  }
  async save(billing: Billing): Promise<Billing> {
    try {
      billing.code = await generateSequencedCode();
      billing.createdAt = new Date();
      const saved = await BillingModel.create(billing);
      const { items } = saved;
      for await (const item of items) {
        const kardexTransaction: KardexTransaction = {
          code: new Date().getMilliseconds().toString(),
          type: KardexTransactionType.OUT,
          itemId: item._id,
          units: 1,
        };
        await kardexTransactionService.save(kardexTransaction);
      }
      return saved;
    } catch (error) {
      console.log(error);
      return Promise.reject(null);
    }
  }

  async update(_: string, __: Billing): Promise<Billing | null> {
    throw new Error('Not Supported');
  }
}

async function generateSequencedCode(): Promise<string> {
  let generatedSequencedCode = '';
  const { _id, prefixPart1, prefixPart2, sequence } =
    (await sequencedCodeService.findLastOne()) || {};
  if (_id && sequence !== undefined) {
    const newSequence = sequence + 1;
    await sequencedCodeService.update(_id, newSequence);
    generatedSequencedCode = `${prefixPart1}${prefixPart2}${newSequence}`;
  }
  return generatedSequencedCode;
}
