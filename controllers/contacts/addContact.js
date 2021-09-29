const Contacts = require('../../repositories/contacts');

const addContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contacts = await Contacts.addContact(userId,req.body);
    return res
      .status(201)
      .json({ status: 'success', code: 201, data: { contacts } });
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;