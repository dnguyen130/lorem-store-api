const db = require("./db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function login(user) {
	const res = await db.query(
		`SELECT email, password FROM User WHERE email='${user.body.email}'`
	);
	const storedHash = res[0].password;
	return new Promise((resolve, reject) => {
		bcrypt.compare(user.body.password, storedHash, function (err, res) {
			if (res) {
				jwt.sign(
					{ id: user.id },
					process.env.JWT_SECRET,
					{ algorithm: "HS256" },
					function (err, token) {
						if (err) reject(err);
						resolve({ token: token });
					}
				);
			} else {
				resolve({ error: "wrongpassword" });
			}
		});
	});
}

async function create(user) {
	const hashedPassword = await bcrypt.hash(user.password, 10);
	const result = await db.query(
		`INSERT INTO User(
			email, 
			password, 
			first_name, 
			last_name
		)
    VALUES(
			'${user.email}', 
			'${hashedPassword}', 
			'${user.first_name}', 
			'${user.last_name}'
		)`
	);
	return { result };
}

async function addAddress(user, address) {
	const result = await db.query(
		`INSERT INTO User_Address(
			user_id, 
			address_line1, 
			address_line2, 
			city, 
			postal_code, 
			country)
		VALUES (
			'${user.id}',
			'${address.address_line1}',
			'${address.address_line2}',
			'${address.city}',
			'${address.postal_code}',
			'${address.country}'
		)`
	);
}

module.exports = { create, login, addAddress };
