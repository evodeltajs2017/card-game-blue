const sql = require("mssql");

class SampleRoute {
	constructor(expressApp) {
		this.app = expressApp;
	}

	initialize() {
		const config = {
			user: "a",
			password: "a",
			server: "localhost",
			database: "CardGame",
			port: 1848
		};

		this.app.post("/sample", (req, res) => {
			sql.connect(config, err => {
				if (err) {
					res.status(500).send(err);
					sql.close();
				}

				new sql.Request().query("select * from [dbo].[User]", (err, result) => {
					console.log(result);
					res.json(result.recordset[0]);
					sql.close();
				});
			});

			sql.on("error", err => {
				res.status(500).send(err);
				sql.close();
			});
		});
	}
}

module.exports = SampleRoute;