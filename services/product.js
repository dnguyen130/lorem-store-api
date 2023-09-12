require("dotenv").config();
const db = require("./db");
const helper = require("../helper");
const config = require("../config");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
	cloud_name: process.env.cloud_name,
	api_key: process.env.api_key,
	api_secret: process.env.api_secret
});

console.log(cloudinary.config().cloud_name);

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
		const cloud_res = await cloudinary.uploader.upload(product.image, {
			resource_type: "image"
		});
		const image_url = cloud_res.url;
		const result = await db.query(
			`INSERT INTO Product
			(name, description, brand, image, SKU, category, size, price)
			VALUES
			(${product.name}, ${product.description}, ${product.brand}, ${image_url}, ${product.sku}, ${product.category}, ${product.size}. ${product.price})`
		);
	} catch {
		console.log("error", JSON.stringify(err, null, 2));
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
