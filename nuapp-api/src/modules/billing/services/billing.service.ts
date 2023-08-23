import BillingModel from '../db/models/billing.model';
import { singleton, container } from 'tsyringe';
import { BaseService } from '../../../helpers/abstracts/base.service';
import { SequencedCodeService } from './sequenced-code.service';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { KardexTransactionService } from '../../inventory/services/kardex-transaction.service';
import { KardexTransactionType } from '../../inventory/entities/enums/kardex-transaction-type';
import { Billing } from '../entities/Billing';
import { getStatsPipeline } from './stats.aggregate';
dayjs.extend(utc);

const kardexTransactionService = container.resolve(KardexTransactionService);
const sequencedCodeService = container.resolve(SequencedCodeService);

@singleton()
export class BillingService extends BaseService<Billing> {
  async findOne(id: string): Promise<Billing | null> {
    return await BillingModel.findById(id).exec();
  }
  async findAll({ page = 1 }): Promise<Billing[]> {
    const billings: Billing[] = await BillingModel.find()
      .skip(10 * (page - 1))
      .limit(10)
      .sort({ 'createdAt.date': -1 })
      .exec();
    return billings;
  }
  async findGreaterThanDate(date: string): Promise<Billing[]> {
    const startDate = dayjs(date)
      .set('hours', 0)
      .set('minutes', 0)
      .set('seconds', 0)
      .utcOffset(-5)
      .toDate()
      .getTime();
    const billings: Billing[] = await BillingModel.aggregate(
      getStatsPipeline(startDate),
    ).exec();
    return billings;
  }
  async save(billing: Billing): Promise<Billing> {
    try {
      billing.code = await generateSequencedCode();
      const saved = await BillingModel.create(billing);
      setImmediate(async () => await this.saveItemsMovements(saved));
      return saved;
    } catch (error) {
      console.log(error);
      return Promise.reject(null);
    }
  }

  async saveItemsMovements(billingSaved: Billing) {
    try {
      const itemsMovement = billingSaved.items.map(
        ({ _id, code, units = 1, multiplicity = 1 }) => ({
          itemId: _id,
          itemCode: code,
          units: units * multiplicity,
          type: KardexTransactionType.OUT,
          createdAt: billingSaved.createdAt,
          computed: false,
        }),
      );
      await kardexTransactionService.saveAll(itemsMovement);
    } catch (error) {
      console.error(error);
    }
  }

  async saveAll(billings: Billing[]): Promise<any> {
    try {
      for (const billing of billings) {
        billing.code = await generateSequencedCode();
      }
      let billingModels = billings.map((billing) => new BillingModel(billing));
      const result = await BillingModel.bulkSave(billingModels);
      return result;
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
