const listContacts = require('./getAllContacts')

const getContactById = async (id) => {
  const contacts = await listContacts()
  const idx = contacts.findIndex(item => item.id === id)
  if (idx === -1) {
    return null
  }
  return contacts[idx]
}
module.exports = getContactById