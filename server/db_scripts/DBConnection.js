const sql = require("mssql");

class DBConnection {
	constructor() {
		const config = {
			user: "a",
			password: "a",
			server: "localhost",
			database: "CardGame",
			port: 1848
		};

		sql.connect(config, err => {
			if (err) {
				res.status(500).send(err);
				sql.close();
			}
		});
	}

	initialize() {
		
	}

	getConnection() {

	}
}

module.exports = DBConnection;