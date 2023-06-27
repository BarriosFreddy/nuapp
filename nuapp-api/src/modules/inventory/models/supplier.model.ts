import mongoose from 'mongoose';
import { supplierSchema } from '../db/schemas/supplier.schema';

const SupplierModel = mongoose.model('Supplier', supplierSchema);
export default SupplierModel;
