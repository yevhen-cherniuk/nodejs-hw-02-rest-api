const express = require('express');
const router = express.Router();

const authenticate = require('../../../middlewares/authenticate');

const {
  validationCreateContact,
  validationUpdateContact,
  validationUpdateStatusContact,
  validateMongoId,
} = require('./validation');
const { contacts: ctrl } = require('../../../controllers');

router.get('/', authenticate, ctrl.getAllContacts);

router.get('/:contactId', authenticate, validateMongoId, ctrl.getByIdContact);

router.post('/', authenticate, validationCreateContact, ctrl.addContact);

router.delete('/:contactId', authenticate, validateMongoId, ctrl.removeContact);

router.put(
  '/:contactId',
  authenticate,
  validateMongoId,
  validationUpdateContact,
  ctrl.updateContact,
);

router.patch(
  '/:contactId/favorite',
  authenticate,
  validateMongoId,
  validationUpdateStatusContact,
  ctrl.updateStatusContact,
);

module.exports = router;