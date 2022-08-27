const joi = require('joi');

const error = '400|Some required fields are missing';

const schema = joi.object({
  title: joi.string().empty().required().messages({
    'string.empty': error,
    'any.required': error,
  }),
  content: joi.string().required().messages({
    'string.empty': error,
    'any.required': error,
  }),
  categoryIds: joi.array().required().messages({
    'any.required': error,
  }),
});

module.exports = schema;