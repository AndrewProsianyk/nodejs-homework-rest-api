const Joi = require('joi')
const joiSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    phone: Joi.string().pattern(/^[0-9]+$/).required()
})

module.exports = joiSchema