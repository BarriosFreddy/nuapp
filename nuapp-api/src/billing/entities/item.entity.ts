import { ObjectId } from 'mongoose';

export class Item {
  _id: ObjectId;
  code: string;
  description: string;
  price: number;
  createdAt: number;
  updateAt: number;
}
