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
                var searchQuery = `SELECT COUNT(*) AS number FROM [dbo].[CardType]`;
                var query = `select * from 
                    (select Row_Number() over 
                    (order by [id] DESC) as RowIndex, * from [dbo].[CardType]`;


                if (pagenum == undefined || pagesize == undefined || pagenum === "" || pagesize === "") {
                    res.status(400).send("Page number or page size missing or not valid!");
                    
                } else {

                    if (search == undefined || search == "") {
                        query += `) as Sub Where Sub.RowIndex >= ${pagenum*pagesize+1} and Sub.RowIndex <= ${pagenum*pagesize+pagesize}`;
                    } else {
                        searchQuery += ` where [Name] like '%${search}%'`;
                        query += ` where [Name] like '%${search}%') as Sub Where Sub.RowIndex >= ${pagenum*pagesize+1} and Sub.RowIndex <= ${pagenum*pagesize+pagesize}`;
                    }

                    new sql.Request().query(searchQuery, (err, result) => {
                        maxCount = result.recordset[0].number;
                        maxSearchCount = maxCount;
                    });

                    new sql.Request().query(query, (err, result) => {
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
                        res.json({ items: cardResult, count: maxCount });
                        
                    });
                }

            });
        });


        this.app.post("/view-card-type", (req, res) => {
            sql.connect(config, err => {

                var cardId = req.body.cardTypeId;
                var returnMessage = "";
                var cardTypeDeleted = 0;

                if (cardId == undefined || cardId === "" || cardId < 0) {
                    res.status(400).send("Card ID missing or not valid!");
                    
                } else {
                    this.deleteCardType(returnMessage, cardId, res);
                }

            });
        });


    }

    deleteCards(cardId, result, returnMessage, res) {
        new sql.Request().query(`Delete from [dbo].[Card] where CardTypeId = ${cardId}`, (err, result) => {

            returnMessage += "\nNumber of cards deleted: " + result.rowsAffected[0];

            res.json(returnMessage);
            
        })
    }

    deleteCardType(returnMessage, cardId, res) {
        new sql.Request().query(`Delete from [dbo].[CardType] where Id = ${cardId}`, (err, result) => {

            if (result.rowsAffected[0] > 0)
                returnMessage += "Number of card types deleted: " + result.rowsAffected[0];
            else
                returnMessage += "No cards of that type!";

            if (result.rowsAffected[0] > 0) {

                this.deleteCards(cardId, result, returnMessage, res);
            } else {
                returnMessage += "\nNo cards deleted!";
                res.json(returnMessage);
                
            }

        });
    }
}



module.exports = ViewCardType;