import joi, { Schema } from 'joi';

const ItemCreateSchema: Schema = joi.object({
  name: joi.string().required(),
  description: joi.string(),
  code: joi.string().required(),
  categoryId: joi.string().required(),
  stock: joi.number().required(),
  reorderPoint: joi.number(),
  lot: joi.string().allow(''),
  expirationDate: joi.string().allow(''),
  laboratory: joi.string().allow(''),
  pricesRatio: joi.array().items(
    joi.object({
      price: joi.number().required(),
      cost: joi.number().required(),
      measurementUnit: joi.string().required(),
      hash: joi.string(),
      main: joi.string().allow(''),
      multiplicity: joi.number().required(),
      organizationId: joi.string().allow(''),
    }),
  ),
});

const ItemUpdateSchema: Schema = joi.object({
  name: joi.string(),
  description: joi.string(),
  code: joi.string(),
  categoryId: joi.string(),
  stock: joi.number().required(),
  reorderPoint: joi.number(),
  pricesRatio: joi.array().items(
    joi.object({
      _id: joi.string(),
      price: joi.number().required(),
      cost: joi.number().required(),
      measurementUnit: joi.string().required(),
      hash: joi.string(),
      main: joi.string().allow(''),
      multiplicity: joi.number(),
      organizationId: joi.string().allow(''),
    }),
  ),
  lot: joi.string(),
  expirationDate: joi.string(),
  laboratory: joi.string(),
  createdAt: joi.date(),
  updatedAt: joi.date(),
  __v: joi.number(),
});

export { ItemCreateSchema, ItemUpdateSchema };
