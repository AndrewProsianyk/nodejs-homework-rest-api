const express = require('express')
const router = express.Router()

const { controllerWrapper, validation } = require('../../middlewares')
const { joiSchema } = require('../../models/contact')
const { contacts: ctrl } = require('../../controllers')

router.get('/', controllerWrapper(ctrl.listContacts))

router.get('/:id', controllerWrapper(ctrl.getContactById))

router.post('/', validation(joiSchema), controllerWrapper(ctrl.addContact))

router.delete('/:id', controllerWrapper(ctrl.removeContactById));

router.put('/:id', validation(joiSchema), controllerWrapper(ctrl.updateContact))

router.patch('/:id/favorite', controllerWrapper(ctrl.updateStatusContact))

module.exports = router
