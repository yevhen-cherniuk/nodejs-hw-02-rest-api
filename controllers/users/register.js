const Users = require('../../repositories/users');

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
    const { email, subscription } = await Users.create(req.body);
    return res.status(201).json({
      status: 'success',
      code: 201,
      user: { email, subscription },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;