const sql = require("mssql");

class SampleRoute {
	constructor(expressApp) {
		this.app = expressApp;
	}

	initialize() {

		this.app.post("/sample", (req, res) => {
			
				new sql.Request().query("select * from [dbo].[User]", (err, result) => {
					console.log(result);
					res.json(result.recordset[0]);
				});
			});

			sql.on("error", err => {
				res.status(500).send(err);
				sql.close();
			});
	}
}

module.exports = SampleRoute;