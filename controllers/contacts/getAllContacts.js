const Contacts = require('../../repositories/contacts');

const getAllContacts = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { docs: contacts, ...rest } = await Contacts.listContacts(
      userId,
      req.query,
    );
    return res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        contacts,
        ...rest,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllContacts;