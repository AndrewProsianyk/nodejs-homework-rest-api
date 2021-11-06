const controllerWrapper = require('./controllerWrapper')
const validation = require('./validation')
const authenticate = require('./authenticate')
const upload = require('./uploadFile')

module.exports = {
    controllerWrapper,
    validation,
    authenticate,
    upload
}