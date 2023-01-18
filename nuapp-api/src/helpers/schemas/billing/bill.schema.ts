import joi, { Schema } from 'joi';

const BillCreateSchema: Schema = joi.object({
  code: joi.string().required(),
  billAmount: joi.number().required(),
  items: joi.array().items(joi.string()).required(),
});

const BillUpdateSchema: Schema = joi.object({
  code: joi.string(),
  billAmount: joi.number(),
  items: joi.array().items(joi.string()),
});

export { BillCreateSchema, BillUpdateSchema };
