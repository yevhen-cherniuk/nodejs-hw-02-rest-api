const User = require('../model/user');

const findById = async id => {
  return await User.findById(id);
};

const findByEmail = async email => {
  return await User.findOne({ email });
};

const create = async body => {
  const user = new User(body);
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};
const updateAvatar = async (id, avatar) => {
  const result = await User.updateOne({ _id: id }, { avatarURL: avatar });
  return result;
};

const updateSubscriptionUser = async (userId, body) => {
  const result = await User.findOneAndUpdate(
    { _id: userId },
    { subscription: body },
    { returnDocument: 'after', runValidators: true },
  );
  return result;
};

module.exports = {
  findById,
  findByEmail,
  create,
  updateToken,
  updateSubscriptionUser,
  updateAvatar,
};