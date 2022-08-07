import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Date } from 'mongoose';
import { BillDocument } from './schemas/bill.schema';
import { BillDto } from './dto/bill.dto';

@Injectable()
export class BillService {
  async findByDate(date: string) {
    return await this.billModel.find({});
  }

  constructor(@InjectModel('bills') private billModel: Model<BillDocument>) {}

  async findAll() {
    return await this.billModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  async save(billDto: BillDto) {
    billDto.code = new Date().getTime().toString();
    billDto.createdAt = new Date();
    return await this.billModel.create(billDto);
  }
}
