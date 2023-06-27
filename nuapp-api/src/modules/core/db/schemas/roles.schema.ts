import { Schema, Types } from 'mongoose';

export const roleSchema = new Schema({
  name: { type: String, required: true },
  modifiedBy: { type: Types.ObjectId },
  moduleAccess: [
    {
      moduleId: { type: Types.ObjectId },
      canSee: Boolean,
      canCreate: Boolean,
      canUpdate: Boolean,
      canDelete: Boolean,
      canExecute: Boolean,
    },
  ],
  createdAt: Date,
  updatedAt: Date,
});
