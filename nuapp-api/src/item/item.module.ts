import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { BillController } from './bill.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemSchema } from './schemas/item.schema';
import { BillService } from './bill.service';
import { BillSchema } from './schemas/bill.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'items', schema: ItemSchema },
      { name: 'bills', schema: BillSchema },
    ]),
  ],
  controllers: [ItemController, BillController],
  providers: [ItemService, BillService],
})
export class ItemModule {}
