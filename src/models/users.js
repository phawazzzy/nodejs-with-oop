const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true }
}, { timestamp: true });

module.exports = mongoose.model("users", userSchema);
