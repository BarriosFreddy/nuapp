import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { BillService } from '../services/bill.service';
import { BillDto } from '../dtos/bill.dto';
import { DailyBillsDto } from '../dtos/DailyBills.dto';
import { DailyBillService } from '../services/DailyBills.service';

@Controller('bill')
export class BillController {
  constructor(
    private readonly billService: BillService,
    private readonly dailyBillsService: DailyBillService,
  ) {}

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

  @Post('/close')
  async closeDay(@Body() dailyBillsDto: DailyBillsDto) {
    const response = await this.dailyBillsService.closeDay(dailyBillsDto);
    const result = { data: response };
    return result;
  }

  @Get('/daily/:date')
  async findDailyBillsByDate(
    @Param('date') date: string,
    @Query('page') page: number,
  ) {
    const billsByDate = await this.dailyBillsService.findByDate(date, page);
    const result = { data: billsByDate };
    return result;
  }
}
