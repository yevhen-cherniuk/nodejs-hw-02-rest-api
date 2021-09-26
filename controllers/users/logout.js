const Users = require('../../repositories/users');

const logout = async (req, res, next) => {
  try {
    const id = req.user.id;
    await Users.updateToken(id, null);
    return res.status(204).json({});
  } catch (error) {
    next(error);
  }
};

module.exports = logout;