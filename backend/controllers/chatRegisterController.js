const User = require("../models/chatRegisterModel");
const bcrypt = require('bcrypt');

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const usernameCheck = await User.findOne({ username });
        //check username already used or not
        if (usernameCheck)
            return res.json({ msg: "User name already used", status: false });

        //email checking
        const emailCheck = await User.findOne({ email });
        if (emailCheck)
            return res.json({ msg: "Email already used", status: false });

        // if everything ok should hash password
        //after passing password solved value(type of encription) should pass
        const hashPassword = await bcrypt.hash(password, 10)

        //insert user values into the database
        const user = await User.create({
            email,
            username,
            password: hashPassword,
        });
        //after returns userid and all the information of the user we don't need password
        delete user.password;
        return res.json({ status: true, user })
    } catch (error) {
        next(error);
    }
};
module.exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user)
            return res.json({ msg: "Incorrect username or password", status: false });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
            return res.json({ msg: "Incorrect username or password", status: false });
        delete user.password;

        return res.json({ status: true, user })
    } catch (error) {
        next(error);
    }
};

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({ _id: { $ne: req.params.id } }).select([
            "email",
            "username",
            "_id"
        ]);
        return res.json(users);
    } catch (error) {
        next(error);
    }
}