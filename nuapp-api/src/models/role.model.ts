import { getModelForClass, prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import mongoose from 'mongoose';



export class Role extends TimeStamps {
  _id!: mongoose.Types.ObjectId;
  @prop()
  public name?: string;
  @prop()
  public modifiedBy?: mongoose.Types.ObjectId;
}

const RoleModel = getModelForClass(Role);
export default RoleModel;
