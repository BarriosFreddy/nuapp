import { getModelForClass, prop, ModelOptions } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import mongoose from 'mongoose';

@ModelOptions({
  options: {
    customName: 'user-accounts',
  },
})
export class UserAccount extends TimeStamps {
  _id!: mongoose.Types.ObjectId;
  @prop()
  public dniType?: string;
  @prop()
  public dni?: string;
  @prop()
  public firstName?: string;
  @prop()
  public lastName?: string;
  @prop()
  public birthdate?: Date;
  @prop()
  public codePost?: string;
  @prop()
  public phone?: string;
  @prop()
  public address?: string;
  @prop()
  public email?: string;
  @prop()
  public password?: string;
  @prop({ type: () => [String] })
  public roles?: string[];
  @prop()
  public modifiedBy?: mongoose.Types.ObjectId;
}

const UserAccountModel = getModelForClass(UserAccount);
export default UserAccountModel;
