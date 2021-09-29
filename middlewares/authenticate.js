const jwt = require('jsonwebtoken')
const { Unauthorized } = require('http-json-errors')

const { User } = require('../model')

const { SECRET_KEY } = process.env

const authenticate = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return next(new Unauthorized())
    }

    const [bearer, token] = req.headers.authorization.split(' ')
    if (bearer !== 'Bearer') {
      throw new Unauthorized('Not authorized')
    }
    jwt.verify(token, SECRET_KEY)

    const user = await User.findOne({ token })
    if (!user) {
      return next(new Unauthorized())
    }
    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}
module.exports = authenticate