const sql = require("mssql");

class ViewCardType {
    constructor(expressApp) {
        this.app = expressApp;
    }

    initialize() {

        let cardResult = [];
        let maxCount;


        const config = {
            user: "test",
            password: "test",
            server: "localhost",
            database: "CardGame",
            port: 50085
        };

        this.app.get("/view-card-type", (req, res) => {
            sql.connect(config, err => {
                if (err) {
                    res.status(500).send(err);
                    sql.close();
                }

                new sql.Request().query("SELECT COUNT(*) AS number FROM [dbo].[CardType]", (err, result) => {
                    maxCount = result.recordset[0].number;
                });

                new sql.Request().query("select * from [dbo].[CardType]", (err, result) => {

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


                    //res.json(maxCount);
                    res.json({ items: cardResult, count: maxCount });

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