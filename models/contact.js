const { Schema, model } = require('mongoose')
const Joi = require('joi')

const contactSchema = Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    }
})

const joiSchema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email(/S +@[a - z]+.[a - z] +$/).required(),
    phone: Joi.string().pattern(/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/).required(),
    favorite: Joi.boolean()
})

const Contact = model('contact', contactSchema)

module.exports = {
    Contact,
    joiSchema
}