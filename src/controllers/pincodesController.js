const express = require("express");
const Pincodes = require("../models/pincodesModel");
const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const pincodes = await Pincodes.find().lean().exec();
		return res.status(200).send(pincodes);
	} catch (error) {}
});

module.exports = router;
