import { getModelForClass, prop } from '@typegoose/typegoose';
import mongoose from 'mongoose';

class ModuleAccess {
  @prop()
  public moduleId?: mongoose.Types.ObjectId;
  @prop()
  public canSee?: boolean;
  @prop()
  public canCreate?: boolean;
  @prop()
  public canUpdate?: boolean;
  @prop()
  public canDelete?: boolean;
  @prop()
  public canExecute?: boolean;
}

export class Role {
  @prop()
  id?: mongoose.Types.ObjectId;
  _id?: mongoose.Types.ObjectId;
  @prop()
  public name?: string;
  @prop()
  public createdAt?: Date;
  @prop()
  public updatedAt?: Date;
  @prop()
  public modifiedBy?: mongoose.Types.ObjectId;
  @prop({ type: () => [ModuleAccess] })
  public modulesAccess?: string[];
}

const RoleModel = getModelForClass(Role);
export default RoleModel;
