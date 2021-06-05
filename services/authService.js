const { Forbidden, InternalServerError } = require("http-errors");
const Users = require("../models/users");
const AuthHelpers = require("../helpers/authHelpers");

class AuthServices {
    // user register
    async signup(payload) {
        try {
            const { email, password, username } = payload;
            const checkUser = await Users.findOne({ email });

            // check if user email exist in DB
            if (checkUser) {
                throw Forbidden("user with this email address exists");
            }
            // hash password
            const hash = await AuthHelpers.hashPassword(password);
            
            // save user into the DB
            const user = await Users.create({
                email,
                password: hash,
                username
            });
            if (!user) {
                throw InternalServerError("Unable to save user's data");
            }
            // create token
            const token = await AuthHelpers.generateToken({ userId: user._id });            
            return {
                status: true,
                data: {
                    email: user.email,
                    username: user.username,
                    token
                },
                message: "Authentication successfull",
                error: null
            }
            
        } catch (error) {
            return {
                status: false,
                data: null,
                message: error.message,
                error
            }
        }

    }
}

module.exports = new AuthServices();
