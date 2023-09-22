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
	const listsPerPage = config.listPerPage;
	const total = await db.query(`SELECT COUNT(*) FROM Product`);

	return {
		data,
		meta,
		listsPerPage,
		total
	};
}

async function getById(id) {
	const data = await db.query(
		`SELECT id, name, description, brand, image, SKU, category, size, price FROM Product WHERE id=${id}`
	);

	return {
		data
	};
}

async function create(product) {
	try {
		const result = await db.query(
			`INSERT INTO Product(name, description, brand, image, SKU, category, size, price)
			VALUES('${product.name}', '${product.description}', '${product.brand}', '${product.image}', '${product.SKU}', '${product.category}', '${product.size}', ${product.price})`
		);
		return { result };
	} catch (err) {
		console.log("error: ", err);
		return err;
	}
}

module.exports = {
	getMultiple,
	getById,
	create
};
