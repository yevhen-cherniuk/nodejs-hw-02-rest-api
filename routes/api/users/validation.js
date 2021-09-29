const Joi = require('joi');
const { validate } = require('../../../middlewares/validation');

const schemaPаramsrUser = Joi.object({
  password: Joi.string()
    .pattern(/[0-9a-zA-Z!@#$%^&*]{6,}/)
    .required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: false }).required(),
  subscription: Joi.string().optional(),
});

const schemaSubscriptionUser = Joi.object({
  subscription: Joi.string().pattern(/^[a-zA-Z' ']{3,30}$/),
});

module.exports = {
  validationPаramsUser: (req, res, next) => {
    if ('password' in req.body && 'email' in req.body) {
      return validate(schemaPаramsrUser, req.body, next);
    }
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Missing required name field',
    });
  },
  validationSubscriptionUser: (req, res, next) => {
  if (['starter', 'pro', 'business'].includes(req.body.subscription)) {
      return validate(schemaSubscriptionUser, req.body, next);
    }
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Missing required name field',
    });
  },
};