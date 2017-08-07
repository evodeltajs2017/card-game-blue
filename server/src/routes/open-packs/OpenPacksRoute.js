const sql = require("mssql");

class OpenPacksRoute {
	constructor(expressApp) {
		this.app = expressApp;
	}

	initialize() {
		this.app.post("/open-packs", (req, res) => {
			
				let request = new sql.Request();

				
				request.query("select * from [dbo].[CardType]; update [dbo].[User] set [UnopenedCardPacks] = [UnopenedCardPacks] - 1 where [Id] = 1", (err, result) => {
					console.log(result);
					let array = [];
					let vars = result.recordset;
					let concat = "";
	
					for (let i=0; i<5; i++){
						let item = vars[Math.floor(Math.random()*vars.length)];
						console.log(item);
						array.push(item);
						concat = concat + "(" + item.Id + ", " + 1 + "), ";
					}
					//concat = concat - ", ";
					concat = concat.slice(0, concat.length - 2);
					new sql.Request().query(`insert into [dbo].[Card]([CardTypeId], [UserId]) values ${concat}`, (err, result) => { res.json(array); });
				});
			});

			sql.on("error", err => {
				res.status(500).send(err);
				sql.close();
			});
	}

}
	
module.exports = OpenPacksRoute;