const sql = require("mssql");

class ViewCardsRoute {
    constructor(expressApp) {
        this.app = expressApp;
    }

    getPageOfCards(req, res) {
        let request = new sql.Request();
        request.query(`SELECT TOP 24 * FROM 
                        (SELECT ROW_NUMBER() 
                        OVER (ORDER BY [Id]) AS ROWNUM, * 
                        FROM 
                            (select [dbo].[Card].[Id], [dbo].[CardType].[Name], [dbo].[CardType].[Cost], [dbo].[CardType].[Damage], [dbo].[CardType].[Health], [dbo].[CardType].[ImageIdentifier]
                            from [dbo].[Card]
                            inner join [dbo].[CardType]
                            ON [dbo].[Card].[CardTypeId] = [dbo].[CardType].[Id]) AS [CardsJoined]
                        ) NumberedCardsJoined
                        WHERE ROWNUM >= ${req.query.number} AND [Name] LIKE '%`+ req.query.searchname +`%'`, (err, result) => {
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
