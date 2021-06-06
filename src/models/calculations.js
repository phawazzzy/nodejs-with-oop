const mongoose = require("mongoose");

const { Schema } = mongoose;

const calculationSchema = Schema({
  user: { type: Schema.Types.ObjectId, ref: "users", required: true },
  shape: { type: String, required: true },
  dimensions: { type: Object, required: true },
  area: { type: Number, required: true }
}, { timestamp: true });

module.exports = mongoose.model("calculation", calculationSchema);
