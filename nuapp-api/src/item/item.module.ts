import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { BillController } from './bill.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemSchema } from './schemas/item.schema';
import { BillService } from './bill.service';
import { BillSchema } from './schemas/bill.schema';
import { DailyBillsSchema } from './schemas/dailyBills.schema';
import { DailyBillService } from './service/DailyBills.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'items', schema: ItemSchema },
      { name: 'bills', schema: BillSchema },
      { name: 'dailyBills', schema: DailyBillsSchema },
    ]),
  ],
  controllers: [ItemController, BillController],
  providers: [ItemService, BillService, DailyBillService],
})
export class ItemModule {}
