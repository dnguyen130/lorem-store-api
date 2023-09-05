const config = {
	db: {
		host: process.env.DB_HOST,
		user: process.env.DB_USERNAME,
		port: process.env.DB_PORT,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		connectTimeout: 60000
	},
	listPerPage: 10
};
module.exports = config;
