import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Item } from './item.schema';

export type BillDocument = Bill & Document;

@Schema({
  collection: 'bills',
})
export class Bill {
  @Prop()
  code: string;

  @Prop()
  createdAt: string;

  @Prop()
  total: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }] })
  items: Item[];
}

export const BillSchema = SchemaFactory.createForClass(Bill);
