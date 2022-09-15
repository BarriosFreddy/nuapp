import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { BillDto } from '../dtos/bill.dto';
import { ItemDto } from '../dtos/item.dto';

@Entity('bills')
export class Bill {
  constructor(item?: Partial<BillDto>) {
    Object.assign(this, item);
  }

  @ObjectIdColumn() _id: ObjectID;
  @Column() code: string;
  @Column() items: ItemDto[];
  @Column() total: number;
  @Column() createdAt: string;
  @Column() updateAt: string;
}
