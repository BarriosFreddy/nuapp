import { getModelForClass, prop, ModelOptions } from '@typegoose/typegoose';
import mongoose from 'mongoose';

@ModelOptions({
  options: {
    customName: 'user-accounts',
  },
})
export class UserAccount {
  @prop()
  id?: mongoose.Types.ObjectId;
  _id?: mongoose.Types.ObjectId;
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
  public createdAt?: Date;
  @prop()
  public updatedAt?: Date;
  @prop()
  public modifiedBy?: mongoose.Types.ObjectId;
}

const UserAccountModel = getModelForClass(UserAccount);
export default UserAccountModel;
