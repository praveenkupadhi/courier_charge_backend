const mongoose = require("mongoose");

module.exports = () => {
	return mongoose.connect(
		"mongodb+srv://praveen:prav1234@couriercharge.aynkv.mongodb.net/courier_charge"
	);
};
