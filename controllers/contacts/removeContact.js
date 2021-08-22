const Contacts = require('../../model');

const removeContact = async (req, res, next) => {
    try {
        const contact = await Contacts.removeContact(req.params.contactId);
        if (contact) {
            return res.status(200).json({
                status: 'success',
                code: 200,
                message: 'Contact deleted',
                data: { contact },
            });
        }
        return res
            .status(404)
            .json({ status: 'error', code: 404, message: 'Not found' });
    } catch (error) {
        next(error);
    }
};

module.exports = removeContact;