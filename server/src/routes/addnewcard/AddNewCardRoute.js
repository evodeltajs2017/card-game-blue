const sql = require("mssql");


class AddNewCardRoute {
	constructor(expressApp) {
		this.app = expressApp;
	}

	initialize(){
		console.log("something");
		const config = {
			user: "test",
			password: "test",
			server: "localhost",
			database: "CardGame",
			port: 60654
		};
		
		this.app.post("/addnewcard", (req, res) => {

			//TBD data processing

			sql.connect(config, err => {
				//console.log(res);
				if (err) {
					res.status(500).send(err);
					sql.close();
				}
			});

		// new sql.Request().query(`Insert into CardType (Name,Cost,Damage,Health) values $req.body. `, (err, result) => {
		// 			res.json(result.recordset[0]);
		// 			sql.close();
		//		});
		console.log(req.body);
	//	sql.close();
		});


	}


}

module.exports = AddNewCardRoute;