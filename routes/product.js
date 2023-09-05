const express = require("express");
const router = express.Router();
const product = require("../services/product");

router.get("/", async function (req, res, next) {
	try {
		res.json(await product.getMultiple(req.query.page));
	} catch (err) {
		console.error(`Error while getting products `, err.message);
		next(err);
	}
});

router.post("/", async function (req, res, next) {
	try {
		res.json(await product.create(req.body));
	} catch (err) {
		console.log("Error creating product: ", err.message);
		next.err;
	}
});

module.exports = router;
