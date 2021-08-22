const fs = require('fs/promises');
const path = require('path');
const { v4: uuid } = require('uuid');

const filePath = path.join(__dirname, 'contacts.json');

const readContacts = async () => {
  const data = await fs.readFile(filePath);
  return JSON.parse(data);
};

const listContacts = async () => {
  return await readContacts();
};

const getContactById = async contactId => {
  const data = await readContacts();
  const result = isNaN(contactId)
    ? data.find(contact => contact.id === contactId)
    : data.find(contact => contact.id === +contactId);
  return result;
};

const removeContact = async contactId => {
  const data = await readContacts();
  const contactIdx = isNaN(contactId)
    ? data.findIndex(contact => contact.id === contactId)
    : data.findIndex(contact => contact.id === +contactId);
  if (contactIdx !== -1) {
    const contactDelete = data.splice(contactIdx, 1);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    return contactDelete;
  }
  return null;
};

const addContact = async body => {
  const id = uuid();
  const record = {
    id,
    ...body,
  };
  const data = await readContacts();
  data.push(record);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  return record;
};

const updateContact = async (contactId, body) => {
  const data = await readContacts();
  const [result] = isNaN(contactId)
    ? data.filter(contact => contact.id === contactId)
    : data.filter(contact => contact.id === +contactId);
  if (result) {
    Object.assign(result, body);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  }
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
