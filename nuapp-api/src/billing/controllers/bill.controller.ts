import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { BillService } from '../services/bill.service';
import { BillDto } from '../dtos/bill.dto';

@Controller('bill')
export class BillController {
  constructor(private readonly billService: BillService) {}

  @Post()
  create(@Body() billDto: BillDto) {
    return this.billService.save(billDto);
  }

  @Get('/date/:date')
  async findByDate(@Param('date') date: string) {
    const billsByDate = await this.billService.findByDate(date);
    const result = { data: billsByDate };
    return result;
  }
}
