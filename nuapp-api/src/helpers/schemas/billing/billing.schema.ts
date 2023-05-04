import joi, { Schema } from 'joi';

const BillingCreateSchema: Schema = joi.object({
  code: joi.string().required(),
  billAmount: joi.number().required(),
  items: joi.array().items(joi.string()).required(),
});

const BillingUpdateSchema: Schema = joi.object({
  code: joi.string(),
  billAmount: joi.number(),
  items: joi.array().items(joi.string()),
});

export { BillingCreateSchema as BillCreateSchema, BillingUpdateSchema as BillUpdateSchema };
