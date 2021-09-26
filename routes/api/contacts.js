const express = require('express');
const router = express.Router();

const {
  validationCreateContact,
  validationUpdateContact,
  validationUpdateStatusContact,
  validateMongoId,
} = require('./validation');
const { contacts: ctrl } = require('../../controllers');

router.get('/', ctrl.getAllContacts);

router.get('/:contactId', validateMongoId, ctrl.getByIdContact);

router.post('/', validationCreateContact, ctrl.addContact);

router.delete('/:contactId', validateMongoId, ctrl.removeContact);

router.put(
  '/:contactId',
  validateMongoId,
  validationUpdateContact,
  ctrl.updateContact,
);

router.patch(
  '/:contactId/favorite',
  validateMongoId,
  validationUpdateStatusContact,
  ctrl.updateStatusContact,
);

module.exports = router;