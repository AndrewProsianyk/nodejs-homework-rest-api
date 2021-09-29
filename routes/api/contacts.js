/* eslint-disable new-cap */
const express = require('express')
const router = express.Router()
const { NotFound, BadRequest } = require('http-errors')
const contactsOperations = require('../../model/index')
const Joi = require('joi')

const joiSchema = Joi.object({
  // id: Joi.number(),
  name: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  phone: Joi.string().pattern(/^[0-9]+$/).required()
})

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts()
    res.json({
      status: 'success',
      code: 200,
      data: {
        contacts
      }
    })
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const contact = await contactsOperations.getContactById(id)
    if (!contact) {
      throw new NotFound('Contact not found')
      // const error = new Error('Contact not found')
      // error.status = 404
      // throw error
      // res.status(404).json({
      //   status: 'error',
      //   code: 404,
      //   message: 'Contact not found'
      // })
      // return
    }
    res.json(contact)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body)
    if (error) {
      throw new BadRequest(error.message)
    }
    const newContact = await contactsOperations.addContact(req.body)
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        newContact
      }
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    // const { error } = joiSchema.validate(req.body)
    // if (error) {
    //   throw new BadRequest(error.message)
    // }
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
  } catch (error) {
    next(error)
  }
})

module.exports = router
