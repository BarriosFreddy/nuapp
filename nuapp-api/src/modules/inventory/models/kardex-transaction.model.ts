import mongoose from 'mongoose';
import { kardexTransactionSchema } from '../db/schemas/kardex-transaction.schema';

const KardexTransactionModel = mongoose.model(
  'KardexTransactions',
  kardexTransactionSchema,
  'kardex-transactions',
);
export default KardexTransactionModel;
