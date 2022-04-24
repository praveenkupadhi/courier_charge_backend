const mongoose = require("mongoose");

const ratesSchema = new mongoose.Schema({
	rate_type: { type: String },
	zone: { type: String },
	first_half_kilo_rate: { type: Number },
	every_additional_half_kilo_rate: { type: Number },
});

const Rate = mongoose.model("Rate", ratesSchema);

module.exports = Rate;
