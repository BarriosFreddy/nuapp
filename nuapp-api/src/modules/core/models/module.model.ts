import mongoose from 'mongoose';
import { moduleSchema } from '../db/schemas/module.schema';

const ModuleModel = mongoose.model('Module', moduleSchema);
export default ModuleModel;
