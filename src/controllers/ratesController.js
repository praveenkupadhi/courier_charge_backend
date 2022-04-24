const express = require("express");
const Rates = require("../models/ratesModel");
const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const rates = await Rates.find().lean().exec();
		return res.status(200).send(rates);
	} catch (error) {}
});

module.exports = router;
