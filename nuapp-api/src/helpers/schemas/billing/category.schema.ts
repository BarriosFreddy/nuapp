import joi, { Schema } from 'joi';

const CategoryCreateSchema: Schema = joi.object({
  name: joi.string().required(),
  description: joi.string(),
});

const CategoryUpdateSchema: Schema = joi.object({
  name: joi.string(),
  description: joi.string(),
});

export { CategoryCreateSchema, CategoryUpdateSchema };
