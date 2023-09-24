const db = require("./db");
const bcrypt = require("bcryptjs");

async function login(user) {
	try {
		const res = await db.query(
			`SELECT email, password FROM User WHERE email='${user.email}'`
		);
		return { res };
	} catch (err) {
		console.log("error:", err);
	}
}

async function create(user) {
	const hashedPassword = await bcrypt.hash(user.password, 10);
	const result = await db.query(
		`INSERT INTO User(email, password, first_name, last_name)
      VALUES('${user.email}', '${hashedPassword}', '${user.first_name}', '${user.last_name}')`
	);
	return { result };
}

module.exports = { create, login };
