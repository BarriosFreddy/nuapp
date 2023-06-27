import mongoose from 'mongoose';
import { roleSchema } from '../db/schemas/roles.schema';

const RoleModel = mongoose.model('Role', roleSchema);
export default RoleModel;
