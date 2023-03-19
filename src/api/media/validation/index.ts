import * as Joi from 'joi';
const joiStr = Joi.string();

export const musicSetupschema = Joi.object({
  name: joiStr.required().trim(),
  description: joiStr.required().trim(),
  url: joiStr.required().trim(),
});

export const updateMusicSchema = Joi.object({
  status: joiStr.required().valid('active', 'inactive').default('active'),
});
