const listContacts = require('./getAllContacts')
const updateContacts = require('./updateContacts')

const addContact = async (data) => {
  const contacts = await listContacts()
  const newId = contacts.length + 1
  const newContact = { id: `${newId}`, ...data }
  contacts.push(newContact)

  await updateContacts(contacts)
  return newContact
}

module.exports = addContact
