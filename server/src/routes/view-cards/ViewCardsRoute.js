const sql = require("mssql");

class ViewCardsRoute {
    constructor(expressApp) {
        this.app = expressApp;
    }

    getPageOfCards(req, res) {
        let request = new sql.Request();
        request.query(`SELECT TOP 20 * FROM (SELECT ROW_NUMBER() OVER (ORDER BY Id) AS ROWNUM, * FROM [dbo].[Card]) T2 WHERE ROWNUM >= ${req.query.number}`, (err, result) => {
            res.json(result.recordset);
        });
    }

    initialize() {
        this.app.get("/view-cards/", (req, res) => {
            const array = this.getPageOfCards(req, res);
        });

        sql.on("error", err => {
            res.status(500).send(err);
            sql.close();
        });
    }
}

module.exports = ViewCardsRoute;