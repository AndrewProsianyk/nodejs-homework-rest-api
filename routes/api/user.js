const express = require('express')

const { controllerWrapper, authenticate, upload } = require('../../middlewares')
const { user: ctrl } = require('../../controllers')

const router = express.Router()

router.get('/users/verify/:verificationToken', controllerWrapper(ctrl.verify))
router.patch('/avatars', authenticate, upload.single('avatar'), controllerWrapper(ctrl.updateAvatar))

module.exports = router