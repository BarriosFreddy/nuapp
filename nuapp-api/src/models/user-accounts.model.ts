import { getModelForClass, prop } from "@typegoose/typegoose";
import mongoose from "mongoose";

export class UserAccount {
  @prop()
  id?: mongoose.Types.ObjectId;
  _id?: mongoose.Types.ObjectId;
  @prop()
  public name?: string;
  @prop()
  public email?: string;
  @prop()
  public password?: string;
}

const UserAccountModel = getModelForClass(UserAccount);
export default UserAccountModel;