import mongoose from 'mongoose';
import { userAccountSchema } from '../db/schemas/user-account.schema';

const UserAccountModel = mongoose.model('UserAccount', userAccountSchema, 'user-accounts');
export default UserAccountModel;
