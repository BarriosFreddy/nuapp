import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ItemDocument = Item & Document;

@Schema({
  collection: 'items',
})
export class Item {
  @Prop()
  code: string;

  @Prop()
  description: string;

  @Prop()
  price: number;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
