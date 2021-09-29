const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const current = require('./current');
const subscriptionUpdate = require('./subscriptionUpdate');
const avatars = require('./avatars')

module.exports = {
  register,
  login,
  logout,
  current,
  subscriptionUpdate,
  avatars,
};