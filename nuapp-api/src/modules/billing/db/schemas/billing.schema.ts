import joi, { Schema } from 'joi';

const BillingCreateSchema: Schema = joi.object({
  code: joi.string().required(),
  billAmount: joi.number().required(),
  items: joi
    .array()
    .items(
      joi.object({
        _id: joi.string(),
        name: joi.string(),
        code: joi.string(),
        price: joi.number(),
        units: joi.number(),
        measurementUnit: joi.string(),
      }),
    )
    .required(),
});

export {
  BillingCreateSchema,
};
