import { uuid } from 'uuidv4';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Date } from 'mongoose';
import { BillDocument } from './schemas/bill.schema';
import { BillDto } from './dto/bill.dto';
import { DailyBillsDocument } from './schemas/dailyBills.schema';
import { getCurrentDateAsString } from 'src/helper/utils/DateUtils';
import { DailyBillsDto } from './dto/DailyBills.dto';

@Injectable()
export class BillService {
  constructor(
    @InjectModel('bills') private billModel: Model<BillDocument>,
    @InjectModel('dailyBills')
    private billsPerDayModel: Model<DailyBillsDocument>,
  ) {}

  async findByDate(date: string) {
    return await this.billModel.find({
      createdAt: date,
    });
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
