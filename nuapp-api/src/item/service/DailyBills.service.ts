import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DailyBillsDto } from '../dto/DailyBills.dto';
import { DailyBillsDocument } from '../schemas/dailyBills.schema';
import { getCurrentDateAsString } from 'src/helper/utils/DateUtils';

@Injectable()
export class DailyBillService {
  constructor(
    @InjectModel('bills') private billModel: Model<DailyBillsDocument>,
    @InjectModel('dailyBills')
    private dailyBillsModel: Model<DailyBillsDocument>,
  ) {}

  async findByDate(date: string, page = 1) {
    return await this.dailyBillsModel.findOne(
      {
        date,
      },
      {},
      { skip: --page * 10 },
    );
  }

  async closeDay(dailyBills: DailyBillsDto) {
    dailyBills.createdAt = getCurrentDateAsString();
    dailyBills.items = await this.billModel.find(
      {
        createdAt: dailyBills.date,
      },
      { _id: 1 },
    );
    return await this.dailyBillsModel.create(dailyBills);
  }
}
