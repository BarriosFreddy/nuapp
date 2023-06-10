import joi, { Schema } from 'joi';

const KardexBulkCreateSchema: Schema = joi.array().items(
  joi.object({
    code: joi.string().required(),
    itemId: joi.string().required(),
    units: joi.number().required(),
    type: joi.string().allow('IN', 'OUT'),
    createdAt: joi.object({
      date: joi.number(),
      offset: joi.number(),
    }),
  }),
);

export { KardexBulkCreateSchema };
