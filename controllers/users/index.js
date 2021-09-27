const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const current = require('./current');
const subscriptionUpdate = require('./subscriptionUpdate')

module.exports = {
  register,
  login,
  logout,
  current,
  subscriptionUpdate,
};