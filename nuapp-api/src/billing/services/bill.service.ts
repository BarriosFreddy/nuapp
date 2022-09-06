import { uuid } from 'uuidv4';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Date } from 'mongoose';
import { BillDocument } from '../schemas/bill.schema';
import { BillDto } from '../dtos/bill.dto';
import { DailyBillsDocument } from '../schemas/dailyBills.schema';
import { getCurrentDateAsString } from 'src/billing/utils/DateUtils';
import { DailyBillsDto } from '../dtos/DailyBills.dto';

@Injectable()
export class BillService {
  constructor(
    @InjectModel('bills') private billModel: Model<BillDocument>,
    @InjectModel('dailyBills')
    private billsPerDayModel: Model<DailyBillsDocument>,
  ) {}

  async findByDate(date: string, page = 1) {
    return await this.billModel.find(
      {
        createdAt: date,
      },
      {},
      { skip: --page * 10 },
    );
  }

  async findAll() {
    return await this.billModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  async save(billDto: BillDto) {
    billDto.code = uuid();
    billDto.createdAt = getCurrentDateAsString();
    return await this.billModel.create(billDto);
  }
}
