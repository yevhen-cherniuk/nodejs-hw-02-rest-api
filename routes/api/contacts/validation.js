const Joi = require('joi');
const mongoose = require('mongoose');
const { validate }=require('../../../middlewares/validation');

const schemaCreateContact = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z' '\-()0-9]{3,30}$/)
    .required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: false }).required(),
  phone: Joi.string()
    .pattern(/^[' '\-()0-9]{3,30}$/)
    .required(),
  favorite: Joi.boolean().optional(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z' '\-()0-9]{3,30}$/)
    .optional(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: false }).optional(),
  phone: Joi.string()
    .pattern(/^[' '\-()0-9]{3,30}$/)
    .optional(),
}).or('name', 'email', 'phone');

const schemaUpdateStatusContact = Joi.object({
  favorite: Joi.boolean().required(),
});
module.exports = {
  validationCreateContact: (req, res, next) => {
    if ('name' in req.body && 'email' in req.body && 'phone' in req.body) {
      return validate(schemaCreateContact, req.body, next);
    }
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Missing required name field',
    });
  },
  validationUpdateContact: (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Missing fields',
      });
    }
    return validate(schemaUpdateContact, req.body, next);
  },
  validationUpdateStatusContact: (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Missing field favorite',
      });
    }
    return validate(schemaUpdateStatusContact, req.body, next);
  },

  validateMongoId: (req, _res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.contactId)) {
      return next({
        status: 400,
        message: 'Invalid ObjectId',
      });
    }
    next();
  },
};