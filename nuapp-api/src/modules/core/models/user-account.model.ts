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
  @prop({ required: true })
  public dniType?: string;
  @prop({ required: true, unique: true })
  public dni?: string;
  @prop({ required: true })
  public firstName?: string;
  @prop({ required: true })
  public lastName?: string;
  @prop()
  public birthdate?: Date;
  @prop()
  public codePost?: string;
  @prop()
  public phone?: string;
  @prop()
  public address?: string;
  @prop({ required: true, unique: true })
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
