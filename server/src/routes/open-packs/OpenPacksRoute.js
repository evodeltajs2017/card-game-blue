const sql = require("mssql");

class OpenPacksRoute {
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

		this.app.get("/open-packs", (req, res) => {
			sql.connect(config, err => {
				if (err) {
					res.status(500).send(err);
					sql.close();
				}

				new sql.Request().query("select * from [dbo].[User] where id=1", (err, result) => {
					console.log(result);
					//forEach()
					res.json(result.recordset);
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

module.exports = OpenPacksRoute;