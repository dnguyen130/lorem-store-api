const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getMultiple(page = 1) {
	const offset = helper.getOffset(page, config.listPerPage);
	const rows = await db.query(
		`SELECT id, name, description, brand, image, SKU, category, size, price FROM Product LIMIT ${offset},${config.listPerPage}`
	);
	const data = helper.emptyOrRows(rows);
	const meta = { page };

	return {
		data,
		meta
	};
}

async function create(product) {
	try {
		const result = await db.query(
			`INSERT INTO Product
			(name, description, brand, image, SKU, category, size, price)
			VALUES
			(${product.name}, ${product.description}, ${product.brand}, ${product.image}, ${product.sku}, ${product.category}, ${product.size}. ${product.price})`
		);
	} catch (err) {
		console.log("error: ", err);
	}

	let message = "Error in creating new product";

	if (result.affectedRows) {
		message = "New product created successfully";
	}

	return { result };
}

module.exports = {
	getMultiple,
	create
};
