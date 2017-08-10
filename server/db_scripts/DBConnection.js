class DBConnection {
	constructor() {
		this.sql = require("mssql");
		this.config = {
			user: "a",
			password: "a",
			server: "localhost",
			database: "CardGame",
			port: 1848
		};
	}

	initialize() {
		this.sql.connect(this.config, err => {
			if (err) {
				res.status(500).send(err);
				this.sql.close();
			}
		});
	}
}

module.exports = DBConnection;