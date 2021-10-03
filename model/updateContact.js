const listContacts = require('./getAllContacts')
const updateContacts = require('./updateContacts')

const updateContact = async (id, data) => {
  const contacts = await listContacts()
  const idx = contacts.findIndex(item => item.id === id)

  if (idx === -1) {
    return null
  }
  contacts[idx] = { ...contacts[idx], ...data }
  await updateContacts(contacts)
  return contacts[idx]
}

module.exports = updateContact
