const { Contact } = require('../models')
const { NotFound } = require('http-errors')


const listContacts = async (req, res) => {
    const result = await Contact.find({})
    res.json({
        status: 'success',
        code: 200,
        data: {
            result
        }
    });
}

const getContactById = async (req, res) => {
    const { id } = req.params
    const contact = await Contact.findById(id)
    if (!contact) {
        throw new NotFound('Contact not found')
    }
    res.json(contact)
}

const addContact = async (req, res) => {
    const newContact = await Contact.create(req.body)
    res.status(201).json({
        status: 'success',
        code: 201,
        data: {
            newContact
        }
    })
}

const removeContactById = async (req, res) => {
    const { id } = req.params
    const result = await Contact.findByIdAndDelete(id)
    if (!result) {
        throw new NotFound(`Product with id=${id} not found`)
    }
    res.json({
        status: 'success',
        code: 204,
        message: 'Successfully deleted'
    })
}

const updateContact = async (req, res) => {
    const { id } = req.params
    const contact = await Contact.findByIdAndUpdate({ _id: id }, { ...req.body })
    if (!contact) {
        throw new NotFound('Contact not found')
    }
    res.json({
        status: 'success',
        code: 202,
        data: {
            contact
        }
    })
};
const updateStatusContact = async (req, res) => {
    const { id } = req.params
    if (req.body.favorite === undefined) {
        res.status(400).json({
            status: 'error',
            code: 404,
            message: 'missing field favorite'
        })
        return
    }
    const contact = await Contact.findByIdAndUpdate(id, { ...req.body })
    if (!contact) {
        throw new NotFound('Contact not found')
    }
    res.json({
        status: 'success',
        code: 202,
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
    updateContact,
    updateStatusContact
}