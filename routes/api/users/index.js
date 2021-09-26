const express = require('express');
const router = express.Router();
const authenticate = require('../../../middlewares/authenticate');

const {
  validationPаramsUser,
  validationSubscriptionUser,
} = require('./validation');

const { users: ctrl } = require('../../../controllers');

router.patch('/', authenticate, validationSubscriptionUser, ctrl.subscriptionUpdate);
router.post('/signup', validationPаramsUser, ctrl.register);
router.post('/login', validationPаramsUser, ctrl.login);
router.post('/logout', authenticate, ctrl.logout);
router.get('/current', authenticate, ctrl.current);

module.exports = router;