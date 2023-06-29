import { Types } from 'mongoose';
import { DateObject } from '../../../helpers/abstracts/timestamps.abstract';

export class PurchaseOrder {
  constructor(
    public code: string,
    public items: [
      {
        _id: Types.ObjectId;
        name: String;
        units: Number;
        measurementUnit: String;
        cost: Number;
      },
    ],
    public supplierId: Types.ObjectId,
    public comments: String,
    public createdAt: DateObject,
  ) {}
}
