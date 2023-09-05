const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
require("dotenv").config();
const cors = require("cors");
const ProductRouter = require("./routes/product");

app.use(express.json());
app.use(cors());
app.use(
	express.urlencoded({
		extended: true
	})
);

app.get("/", (req, res) => {
	res.json({ message: "ok" });
});

app.use("/product", ProductRouter);

app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	console.error(err.message, err.stack);
	res.status(statusCode).json({ message: err.message });
	return;
});

app.listen(port, "0.0.0.0", function () {
	console.log(`Example app listening at http://localhost:${port}`);
});
