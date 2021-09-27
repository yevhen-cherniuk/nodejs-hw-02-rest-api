const Joi = require('joi');
const { validation } = require('../../../middlewares/validation');

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
      return validation(schemaPаramsrUser, req.body, next);
    }
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Missing required name field',
    });
  },
  validationSubscriptionUser: (req, res, next) => {
    if (['starter', 'pro', 'business'].includes(req.body.subscription)) {
      return validation(schemaSubscriptionUser, req.body, next);
    }
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Missing required name field',
    });
  },
};