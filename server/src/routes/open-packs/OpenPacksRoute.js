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

		this.app.post("/open-packs", (req, res) => {
			sql.connect(config, err => {
				if (err) {
					res.status(500).send(err);
					sql.close();
				}

				let request = new sql.Request();

				
				request.query("select * from [dbo].[CardType]; update [dbo].[User] set [UnopenedCardPacks] = [UnopenedCardPacks] - 1 where [Id] = 1", (err, result) => {
					console.log(result);
					let array = [];
					let vars = result.recordset;
	
					for (let i=0; i<5; i++){
						let item = vars[Math.floor(Math.random()*vars.length)];
						console.log(item);
						array.push(item);
						let id = null;
						new sql.Request().query(`insert into [dbo].[Card] values (${id}, ${item.Id}, 1)`, (err, result) => {  });
					}

					res.json(array);
					sql.close();
				});
			});

			sql.on("error", err => {
				res.status(500).send(err);
				sql.close();
			});
		});
	}


	//ceva() {
	//	const cv = new DBConnection();
	//	cv.getConnection();
	//}
}
	
module.exports = OpenPacksRoute;