const Contacts = require('../../repositories/contacts');

const updateStatusContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contacts.updateStatusContact(
      userId,
      req.params.contactId,
      req.body.favorite,
    );
    if (contact) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: { contact } });
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not found' });
  } catch (error) {
    next(error);
  }
};

module.exports = updateStatusContact;