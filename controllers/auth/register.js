const { Conflict } = require("http-errors");
const { User } = require("../../models");
const gravatar = require('gravatar')
const { nanoid } = require('nanoid')
const { sendEmail } = require('../../helpers')

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        throw new Conflict(`User with email ${email} is already registered`);
    }

    const avatarURL = gravatar.url(email)

    const verificationToken = nanoid()

    const newUser = new User({ email, avatarURL, verificationToken });
    newUser.setPassword(password);
    await newUser.save();

    const mail = {
        to: email,
        subject: 'Verification',
        html: `
            < a href = "http://localhost:3000/api/users/verify/${verificationToken}" target = "_blank" > Click to verify your email</a>
        `
    }

    sendEmail(mail)

    res.status(201).json({
        status: "Created",
        code: 201,
        message: "Registration successful",
        user: newUser
    });
};

module.exports = register;