const Users = require('../../repositories/users');
const EmailService = require('../../services/email');
const { CreateSenderSendGrid } = require('../../services/email-sender');

const register = async (req, res, next) => {
  try {
    const user = await Users.findByEmail(req.body.email);

    if (user) {
      return res.status(409).json({
        status: 'error',
        code: 409,
        message: 'Email in use',
      });
    }
    const { email, subscription, avatarURL, verifyToken } = await Users.create(
      req.body,
    );
    try {
      const emailService = new EmailService(
        process.env.NODE_ENV,
        new CreateSenderSendGrid(),
      );
      await emailService.sendVerifyEmail(verifyToken, email);
    } catch (error) {
      console.log(error.message);
    }
    return res.status(201).json({
      status: 'success',
      code: 201,
      user: { email, subscription, avatarURL, verifyToken },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;