const Users = require('../../repositories/users');
const EmailService = require('../../services/email');
const { CreateSenderNodemailer } = require('../../services/email-sender');

const repeatEmailVerify = async (req, res, next) => {
  try {
    const user = await Users.findByEmail(req.body.email);
    if (user) {
      const { email, verify, verifyToken } = user;
      if (!verify) {
        const emailService = new EmailService(
          process.env.NODE_ENV,
          new CreateSenderNodemailer(),
        );
        await emailService.sendVerifyEmail(verifyToken, email);
        return res.status(200).json({
          status: 'success',
          code: 200,
          data: { message: 'Verification email sent' },
        });
      }
      return res.status(409).json({
        status: 'error',
        code: 409,
        message: 'Verification has already been passed',
      });
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not found' });
  } catch (error) {
    next(error);
  }
};

module.exports = repeatEmailVerify;