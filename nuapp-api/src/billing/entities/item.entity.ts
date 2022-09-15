import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';

import { ItemDto } from '../dtos/item.dto';

@Entity('items')
export class Item {
  constructor(item?: Partial<ItemDto>) {
    Object.assign(this, item);
  }

  @ObjectIdColumn() _id: ObjectID;
  @Column() code: string;
  @Column() description: string;
  @Column() price: number;
  @Column() createdAt: string;
  @Column() updateAt: string;
}
