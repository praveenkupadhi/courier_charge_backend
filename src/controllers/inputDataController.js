const axios = require("axios");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
	const pincode = await axios
		.get("http://localhost:3001/pincodes")
		.then((res) => {
			return res.data.filter((d) => req.body.pincode === d.customer_pincode);
		});

	if (pincode.length === 0) {
		return res.status(404).json("Pincode not found");
	}

	const rate = await axios.get("http://localhost:3001/rates").then((res) => {
		for (let i = 0; i < res.data.length; i++) {
			if (
				res.data[i].rate_type === req.body.rateType &&
				pincode[0].zone === res.data[i].zone
			) {
				return res.data[i];
			}
		}
	});

	// console.log(pincode, rate);

	let courier_charge = rate.first_half_kilo_rate;
	req.body.weight -= 0.5;

	while (req.body.weight >= 0.5) {
		courier_charge += rate.every_additional_half_kilo_rate;
		req.body.weight -= 0.5;
	}

	courier_charge +=
		Math.round(req.body.weight) + rate.every_additional_half_kilo_rate;

	return res.status(200).json(courier_charge);
});

module.exports = router;
