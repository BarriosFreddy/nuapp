import mongoose from 'mongoose';
import { billingSchema } from '../db/schemas/billing.schema';

const BillingModel = mongoose.model('Billing', billingSchema)
export default BillingModel;
