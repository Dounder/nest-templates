import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  STATE: Joi.required(),
  DB_PASSWORD: Joi.required(),
  DB_USERNAME: Joi.required(),
  MONGODB_URI: Joi.required(),
  JWT_SECRET: Joi.required(),
  PORT: Joi.number().default(3000),
});
