const sql = require("mssql");

class ViewCardType {
    constructor(expressApp) {
        this.app = expressApp;
    }

    initialize() {

        let cardResult = [];
        let maxCount;
        let maxSearchCount;

        const config = {
            user: "test",
            password: "test",
            server: "localhost",
            database: "CardGame",
            port: 50085
        };

        this.app.get("/view-card-type", (req, res) => {
            sql.connect(config, err => {
                var search = req.query.search;
                var pagenum = req.query.pageIndex - 1;
                var pagesize = req.query.pageSize;

                if (err) {
                    res.status(500).send(err);
                    sql.close();
                }

                new sql.Request().query("SELECT COUNT(*) AS number FROM [dbo].[CardType]", (err, result) => {
                    maxCount = result.recordset[0].number;
                });

                maxSearchCount = maxCount;

                if (search != "") {
                    new sql.Request().query(`SELECT COUNT(*) AS number FROM [dbo].[CardType] where [Name] like '%${search}%'`, (err, result) => {
                        maxSearchCount = result.recordset[0].number;
                    });

                }

                new sql.Request().query(`
                    select * from 
                    (select Row_Number() over 
                    (order by [id] DESC) as RowIndex, * from [dbo].[CardType] where [Name] like '%${search}%') as Sub
                    Where Sub.RowIndex >= ${pagenum*pagesize+1} and Sub.RowIndex <= ${pagenum*pagesize+pagesize}`, (err, result) => {
                    cardResult = result.recordset.map((x) => {
                        return {
                            cod: x.Id,
                            name: x.Name,
                            cost: x.Cost,
                            damage: x.Damage,
                            health: x.Health,
                            imageid: x.ImageIdentifier
                        };
                    });
                    res.json({ items: cardResult, count: maxCount, searchCount: maxSearchCount });
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


module.exports = ViewCardType;