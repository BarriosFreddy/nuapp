import mongoose from 'mongoose';
import { enumerationSchema } from '../db/schemas/enumeration.schema';


const EnumerationModel = mongoose.model('Enumerations', enumerationSchema);
export default EnumerationModel;
