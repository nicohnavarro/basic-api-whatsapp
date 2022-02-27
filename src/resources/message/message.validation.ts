import Joi from 'joi';

const create = Joi.object({
  phone: Joi.string().required(),
  text: Joi.string().required(),
});

export default { create };
