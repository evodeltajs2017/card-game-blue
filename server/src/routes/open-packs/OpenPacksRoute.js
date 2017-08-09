const sql = require("mssql");

class OpenPacksRoute {
	constructor(expressApp) {
		this.app = expressApp;
	}

	insertIntoDB(res, array, concat) {
		let request = new sql.Request();
		request.query(`insert into [dbo].[Card]([CardTypeId], [UserId]) values ${concat}`, (err, result) => {  });
		res.json(array);
		
	}

	updateUserInfo(res, array, concat) {
		let request = new sql.Request();
		request.query(`update [dbo].[User] set [UnopenedCardPacks] = [UnopenedCardPacks] - 1 where [Id] = 1`, (err, result) => { });
		this.insertIntoDB(res, array, concat);
		
	}

	openAndGenerate(res) {
		let request = new sql.Request();
		request.query("select * from [dbo].[CardType]", (err, result) => {
			let array = [];
			let vars = result.recordset;
			let concat = "";

			for (let i=0; i<5; i++){
				let item = vars[Math.floor(Math.random()*vars.length)];
				console.log(item);
				array.push(item);
				concat = `${concat} ( ${item.Id}, 1 ), `;
			}
			concat = concat.slice(0, concat.length - 2);
			this.updateUserInfo(res, array, concat);
		});
	}

	checkUnopenedPacks(res) {
		let request = new sql.Request();
		request.query("select * from [dbo].[User] where [Id] = 1", (err, result) => {
			if (result.recordset[0].UnopenedCardPacks <= 0) {
				res.status(400).send("no packs to open");
			}
			else {
				this.openAndGenerate(res);
			}
		});
	}

	initialize() {
		this.app.post("/open-packs", (req, res) => {
			const array = this.checkUnopenedPacks(res);
		});

		sql.on("error", err => {
			res.status(500).send(err);
			sql.close();
		});
	}

}
	
module.exports = OpenPacksRoute;