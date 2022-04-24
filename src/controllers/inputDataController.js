const axios = require("axios");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
	const pincode = await axios
		.get("http://localhost:3001/pincodes")
		.then((res) => {
			return res.data.filter((d) => req.body.pincode === d.customer_pincode);
		});

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

	console.log(pincode, rate);
});

module.exports = router;
