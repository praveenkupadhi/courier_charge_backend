const mongoose = require("mongoose");

const pincodesSchema = new mongoose.Schema({
	customer_pincode: { type: Number },
	zone: { type: String },
});

const Pincode = mongoose.model("pincode", pincodesSchema);

module.exports = Pincode;
