const { Conflict } = require("http-errors");
const { User } = require("../../models");

const register = async (req, res) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        throw new Conflict(`User with email ${email} is already registered`);
    }

    const newUser = new User({ email });
    newUser.setPassword(password);
    await newUser.save();

    res.status(201).json({
        status: "Created",
        code: 201,
        message: "Registration successful",
        user: newUser
    });
};

module.exports = register;