const contactsOperations = require('../model')
const { NotFound } = require('http-errors')


const listContacts = async (req, res, next) => {
    const contacts = await contactsOperations.listContacts()
    res.json({
        status: 'success',
        code: 200,
        data: {
            contacts
        }
    });
}

const getContactById = async (req, res, next) => {
    const { id } = req.params
    const contact = await contactsOperations.getContactById(id)
    if (!contact) {
        throw new NotFound('Contact not found')
    }
    res.json(contact)
}

const addContact = async (req, res, next) => {
    const newContact = await contactsOperations.addContact(req.body)
    res.status(201).json({
        status: 'success',
        code: 201,
        data: {
            newContact
        }
    })
}

const removeContactById = async (req, res, next) => {
    const { id } = req.params
    const result = await contactsOperations.removeContact(id)
    if (!result) {
        throw new NotFound(`Product with id=${id} not found`)
    }
    res.json({
        status: 'success',
        code: 200,
        message: 'Successfully deleted'
    })
}

const updateContact = async (req, res, next) => {
    const { id } = req.params
    const contact = await contactsOperations.updateContact(String(id), req.body)
    if (!contact) {
        throw new NotFound('Contact not found')
    }
    res.json({
        status: 'success',
        code: 200,
        data: {
            contact
        }
    })
};
module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContactById,
    updateContact
}