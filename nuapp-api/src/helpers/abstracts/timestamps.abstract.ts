import { prop, modelOptions, Severity, Prop } from '@typegoose/typegoose';

export class DateObject {
  @Prop()
  public date!: number;
  @Prop()
  public offset!: number;
}
@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export abstract class TimeStamps {
  @prop()
  createdAt?: DateObject;
  @prop()
  updatedAt?: DateObject;
}
