const sql = require("mssql");

class ViewDecks {
    constructor(expressApp) {
        this.app = expressApp;
    }

    initialize() {

        let cardResult = [];
        let maxCount;
     
        this.app.get("/view-decks", (req, res) => {

            var search = req.query.search;
            var pagenum = req.query.pageIndex;
            var pagesize = req.query.pageSize;
            var searchQuery = `SELECT COUNT(*) AS number FROM [dbo].[Deck]`;
            var query = `select * from [dbo].[Deck]`


            if (pagenum == undefined || pagesize == undefined || pagenum === "" || pagesize === "") {
                res.status(400).send("Page number or page size missing or not valid!");
                    
            } else {
          
                let x = (pagenum - 1) * 10;    

                if (search == undefined || search == "") {
                               
                    query += `order by [Id] desc OFFSET ${x} ROWS FETCH NEXT 10 ROWS ONLY`;
                                 
                } else {

                    query += `where [Name] like '%${search}%' order by [Id] desc OFFSET ${x} ROWS FETCH NEXT 10 ROWS ONLY`;
                    searchQuery += `where [Name] like '%${search}%'`;
                }


                new sql.Request().query(searchQuery, (err, result) => {
                    maxCount = result.recordset[0].number;
        
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

        this.app.post("/view-decks", (req, res) => {

            console.log("Prima: " + req.body.cardTypeId);
            var deckId = req.body.cardTypeId;
            var returnMessage = "";
            var cardTypeDeleted = 0;

            if (deckId == undefined || deckId === "" || deckId < 0) {
                res.status(400).send("Card ID missing or not valid!");
                    
            } else {
                this.deleteDeck(returnMessage, deckId, res);
            }

        });

    }

    deleteDeck(returnMessage, cardId, res) {
        new sql.Request().query(`Delete from [dbo].[Deck] where Id = ${cardId}`, (err, result) => {

            if (result.rowsAffected[0] > 0)
                returnMessage += "Number of card types deleted: " + result.rowsAffected[0];
            else
                returnMessage += "No cards of that type!";

         res.json(returnMessage);

        });
    }
}



module.exports = ViewDecks;