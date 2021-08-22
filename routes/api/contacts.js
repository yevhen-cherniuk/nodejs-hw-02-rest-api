const express = require('express');
const router = express.Router();

const {
  validationCreateContact,
  validationUpdateContact,
} = require('./validation');
const { contacts: ctrl } = require('../../controllers');

router.get('/', ctrl.getAllContacts);

router.get('/:contactId', ctrl.getByIdContact);

router.post('/', validationCreateContact, ctrl.addContact);

router.delete('/:contactId', ctrl.removeContact);

router.put('/:contactId', validationUpdateContact, ctrl.updateContact);

module.exports = router;