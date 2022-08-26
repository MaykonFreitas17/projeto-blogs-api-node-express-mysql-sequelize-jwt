const joi = require('joi');

const schema = joi.object({
  displayName: joi.string().min(8).required().messages({
    'string.min': '400|"displayName" length must be at last {#limit} characters long',
    'any.required': '400|"displayName" is required',
  }),
  email: joi.string().email().required().messages({
    'string.email': '400|"email" must be a valid email',
    'any.required': '400|"email" is required',
  }),
  password: joi.string().min(6).required().messages({
    'string.min': '400|"password" length must be at last {#limit} characters long',
    'any.required': '400|"password" is required',
  }),
  image: joi.string().required(),
});

module.exports = schema;