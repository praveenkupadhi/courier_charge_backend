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

	// rounding of the weights
	let weight = req.body.weight.split(".");
	weight[1] = "." + weight[1];
	if (+weight[1] > 0.5) {
		weight[1] = Math.ceil(+weight[1]);
	} else if (+weight[1] > 0) {
		weight[1] = 0.5;
	}
	weight =
		+weight[0] + (typeof weight[1] === "string" ? +weight[1] : weight[1]);

	// courier charge calculation
	let courier_charge = rate.first_half_kilo_rate;
	weight -= 0.5;
	while (weight >= 0.5) {
		courier_charge += rate.every_additional_half_kilo_rate;
		weight -= 0.5;
	}
	courier_charge += weight + rate.every_additional_half_kilo_rate;

	return res.status(200).json(courier_charge);
});

module.exports = router;
