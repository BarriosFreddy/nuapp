import mongoose from 'mongoose';
import { sequencedCodeSchema } from '../db/schemas/sequenced-code.schema';

const SequencedCodeModel = mongoose.model('SequencedCode', sequencedCodeSchema, 'sequenced-codes')
export default SequencedCodeModel;
