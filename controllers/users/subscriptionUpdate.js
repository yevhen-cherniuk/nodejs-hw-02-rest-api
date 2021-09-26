const Users = require('../../repositories/users');

const subscriptionUpdate = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { email, subscription } = await Users.updateSubscriptionUser(
      userId,
      req.body.subscription
    );
    if (email) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: { email, subscription } });
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not found' });
  } catch (error) {
    next(error);
  }
};

module.exports = subscriptionUpdate;