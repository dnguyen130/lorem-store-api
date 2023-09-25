const express = require("express");
const router = express.Router();
const user = require("../services/user");

router.get("/login", async function (req, res, next) {
	try {
		res.json(await user.login(req));
	} catch (err) {
		console.log("Error logging in", err);
		next(err);
	}
});

router.post("/", async function (req, res, next) {
	try {
		res.json(await user.create(req.body));
	} catch (err) {
		console.log("Error creating user", err.message);
		next(err);
	}
});

module.exports = router;
