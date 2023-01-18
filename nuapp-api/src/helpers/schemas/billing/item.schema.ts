import joi, { Schema } from 'joi';

const ItemCreateSchema: Schema = joi.object({
  name: joi.string().required(),
  description: joi.string(),
  code: joi.string().required(),
  categoryId: joi.string().required(),
  price: joi.number().required(),
  units: joi.number().required(),
  measurementUnit: joi.string().required(),
});

const ItemUpdateSchema: Schema = joi.object({
  name: joi.string(),
  description: joi.string(),
  code: joi.string(),
  categoryId: joi.string(),
  price: joi.number(),
  units: joi.number(),
  measurementUnit: joi.string(),
});

export { ItemCreateSchema, ItemUpdateSchema };
