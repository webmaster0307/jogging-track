import Joi from 'joi'

export const newuser = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  mobile: Joi.string().regex(/^[6-9]{1}[0-9]{9}$/).required(),
  password: Joi.string().min(6).required()
})
