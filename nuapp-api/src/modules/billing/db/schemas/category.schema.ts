import joi, { Schema } from 'joi';

const CategoryCreateSchema: Schema = joi.object({
  code: joi.string().required(),
  name: joi.string().required(),
  description: joi.string(),
});

const CategoryUpdateSchema: Schema = joi.object({
  name: joi.string(),
  description: joi.string(),
});

export { CategoryCreateSchema, CategoryUpdateSchema };
