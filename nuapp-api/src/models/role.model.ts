import { getModelForClass, prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import mongoose from 'mongoose';



export class Role extends TimeStamps implements Base {
  @prop()
  id!: string;
  _id!: mongoose.Types.ObjectId;
  @prop()
  public name?: string;
  @prop()
  public modifiedBy?: mongoose.Types.ObjectId;
}

const RoleModel = getModelForClass(Role);
export default RoleModel;
