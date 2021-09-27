const current = (req, res, next) => {
  const { email, subscription } = req.user

  return res.status(200).json({
    status: 'success',
    code: 200,
    user: { email, subscription },
  })
}

module.exports = current