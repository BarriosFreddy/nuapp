import { prop } from '@typegoose/typegoose';
export abstract class TimeStamps {
  @prop()
  createdAt?: {
    date: number;
    offset: number;
  };
  @prop()
  updatedAt?: {
    date: number;
    offset: number;
  };
}
