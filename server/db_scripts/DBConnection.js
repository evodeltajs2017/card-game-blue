class DBConnection {
	constructor() {
		this.sql = require("mssql");
		this.config = {
			user: "demo_blue",
			password: "demo_blue",
			server: "localhost",
			database: "CardGameBlue",
			port: 1858
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