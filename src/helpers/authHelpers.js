const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

class AuthHelpers {
    // constructor(user) {
    //     this.user = user
    // }

   async hashPassword(plainPassword) {
        // checks if there is password provided
        if (!plainPassword) {
            throw new Error("Error hashing password");
        }

        // salt round which bcrypt will use
        const salt = bcrypt.genSaltSync(10);

        // return the generated hashed string
        return bcrypt.hashSync(plainPassword, salt);
    
    }

    async generateToken(payload) {
        const secret = process.env.ACCESS_TOKEN_SECRET;
        return JWT.sign(payload, secret, { expiresIn: "6h" })
    }
}

module.exports = new AuthHelpers();