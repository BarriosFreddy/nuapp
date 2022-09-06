import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Item } from './item.schema';

export type DailyBillsDocument = DailyBills & Document;

@Schema({
  collection: 'dailyBills',
})
export class DailyBills {
  @Prop()
  date: string;

  @Prop()
  createdAt: string;

  @Prop()
  total: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }] })
  items: Item[];
}

export const DailyBillsSchema = SchemaFactory.createForClass(DailyBills);
