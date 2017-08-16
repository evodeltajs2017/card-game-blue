const sql = require("mssql");

class ViewCardsRoute {
    constructor(expressApp) {
        this.app = expressApp;
    }

    getAllCards(res) {
        let request = new sql.Request();
        request.query("select * from [dbo].[Card]", (err, result) => {
            res.json(result);
        });
    }

    initialize() {
        this.app.post("/open-packs", (req, res) => {
            const array = this.getAllCards(res);
        });

        sql.on("error", err => {
            res.status(500).send(err);
            sql.close();
        });
    }

}

module.exports = ViewCardsRoute;