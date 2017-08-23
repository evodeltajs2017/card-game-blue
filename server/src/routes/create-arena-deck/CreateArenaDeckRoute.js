const sql = require("mssql");

class CreateArenaDeckRoute {
    constructor(expressApp) {
        this.app = expressApp;
    }

    getAllCards(req, res) {
        let request = new sql.Request();
        request.query(`SELECT * FROM [dbo].[Card] INNER JOIN [dbo].[CardType] ON [dbo].[Card].[CardTypeId] = [dbo].[CardType].[Id]`, (err, result) => {
            this.randomizeTheCardsAndSendThree(res, result.recordset);
        });
    }

    randomizeTheCardsAndSendThree(res, result) {
        let array = [];
        for (let i = 0; i < 3; i++) {
            let item = result[Math.floor(Math.random() * result.length)];
            while (array.includes(item)){
                let item = result[Math.floor(Math.random() * result.length)];
            }
            array.push(item);
        }
        res.json(array);
    }

    initialize() {
        this.app.get("/create-arena-deck/", (req, res) => {
            this.getAllCards(req, res);
        });

        sql.on("error", err => {
            res.status(500).send(err);
            sql.close();
        });
    }
}

module.exports = CreateArenaDeckRoute;
