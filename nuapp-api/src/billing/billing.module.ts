import { Module } from '@nestjs/common';
import { ItemService } from './services/item.service';
import { BillController } from './controllers/bill.controller';
import { BillService } from './services/bill.service';
import { ItemController } from './controllers/item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Bill } from './entities/bill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item, Bill])],
  controllers: [ItemController, BillController],
  providers: [ItemService, BillService],
})
export class BillingModule {}
