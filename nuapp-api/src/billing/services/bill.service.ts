import { uuid } from 'uuidv4';
import { Injectable } from '@nestjs/common';
import { BillDto } from '../dtos/bill.dto';
import { getCurrentDateAsString } from 'src/billing/utils/DateUtils';
import { InjectRepository } from '@nestjs/typeorm';
import { Bill } from '../entities/bill.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BillService {
  constructor(
    @InjectRepository(Bill)
    private readonly billRepository: Repository<Bill>,
  ) {}

  async findByDate(date: string, page = 1) {
    return await this.billRepository.find({
      where: {
        createdAt: date,
      },
      skip: --page * 10,
    });
  }

  async findAll() {
    return await this.billRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  async save(billDto: BillDto) {
    billDto.code = uuid();
    billDto.createdAt = getCurrentDateAsString();
    return await this.billRepository.save(billDto);
  }
}
