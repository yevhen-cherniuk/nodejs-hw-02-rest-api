const express = require('express');
const router = express.Router();
const authenticate = require('../../../middlewares/authenticate');
const { upload } = require('../../../middlewares');

const {
  validationPаramsUser,
  validationSubscriptionUser,
   validationVerificationEmail,
} = require('./validation');

const { users: ctrl } = require('../../../controllers');

router.patch('/', authenticate, validationSubscriptionUser, ctrl.subscriptionUpdate);
router.patch('/avatars', authenticate, upload.single('avatar'), ctrl.avatars);
router.post('/signup', validationPаramsUser, ctrl.register);
router.post('/login', validationPаramsUser, ctrl.login);
router.post('/logout', authenticate, ctrl.logout);
router.get('/current', authenticate, ctrl.current);
router.get('/verify/:verificationToken', ctrl.verify);
router.post('/verify', validationVerificationEmail, ctrl.repeatEmailVerify);

module.exports = router;