const sql = require("mssql");

class PlayGame {
    constructor(expressApp) {
        this.app = expressApp;
    }

    initialize() {

        let cardResult = [];
        let maxCount;
        let maxSearchCount;

        this.app.get("/play-game", (req, res) => {

            var query = `select * from [dbo].[CardType]`;

            new sql.Request().query(query, (err, result) => {
                cardResult = result.recordset.map((x) => {
                    return {
                        // cod: x.Id,
                        name: x.Name,
                        cost: x.Cost,
                        damage: x.Damage,
                        health: x.Health,
                        imageid: x.ImageIdentifier
                    };
                });
                res.json({ items: cardResult });

            });


        });


    }




}



module.exports = PlayGame;