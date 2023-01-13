import joi, { Schema } from "joi";

const fields = {
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
};

const UserAccountCreateSchema: Schema = joi.object({ ...fields });

const UserAccountUpdateSchema: Schema = joi.object({
  name: joi.string(),
  email: joi.string().email(),
  password: joi.string(),
});

export { UserAccountCreateSchema, UserAccountUpdateSchema };
