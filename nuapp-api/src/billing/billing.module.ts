import { Module } from '@nestjs/common';
import { ItemService } from './services/item.service';
import { BillController } from './controllers/bill.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemSchema } from './schemas/item.schema';
import { BillService } from './services/bill.service';
import { BillSchema } from './schemas/bill.schema';
import { DailyBillsSchema } from './schemas/dailyBills.schema';
import { DailyBillService } from './services/DailyBills.service';
import { ItemController } from './controllers/item.controller';

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
export class BillingModule {}
