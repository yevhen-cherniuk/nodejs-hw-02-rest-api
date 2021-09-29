const Users = require('../../repositories/users');

const verify = async (req, res, next) => {
  try {
    const user = await Users.findByVerifyToken(req.params.verificationToken);
    if (user) {
      await Users.updateTokenVerify(user.id, true, null);
      return res.status(200).json({
        status: 'success',
        code: 200,
        data: { message: 'Verification successful' },
      });
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'User not found' });
  } catch (error) {
    next(error);
  }
};

module.exports = verify;