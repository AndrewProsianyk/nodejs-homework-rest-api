const { sendEmail } = require('../../helpers')
const { User } = require('../../models')

const reVerify = async (req, res) => {
    const { email } = req.body
    if (!email) {
        res.json({
            code: 400,
            message: 'Missing required field email'
        })
        return
    }
    const user = await User.findOne({ email })
    if (!user) {
        res.json({
            code: 400,
            message: 'User not found'
        })
        return
    }
    if (user.verify) {
        res.json({
            code: 400,
            message: 'Verification has already been passed'
        })
        return
    }
    const mail = {
        to: email,
        subject: 'Verification',
        html: `
            < a href = "http://localhost:3000/api/users/verify/${user.verificationToken}" target = "_blank" > Click to verify your email</a>
        `
    }
    sendEmail(mail)

    res.json({
        status: 'success',
        code: 200,
        message: 'Verification email sent'
    })
}

module.exports = reVerify