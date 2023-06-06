import { prop, modelOptions, Severity } from '@typegoose/typegoose';

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
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
